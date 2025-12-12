import { parse, validate } from "@tma.js/init-data-node"
import { initTRPC, TRPCError } from "@trpc/server"
import { Result } from "neverthrow"
import superjson from "superjson"
import * as z from "zod"
import { env } from "@/lib/env"

export const createTRPCContext = (opts: { headers: Headers }) => {
	const telegramInitDataString = opts.headers.get("x-telegram-init-data")

	if (telegramInitDataString === null || telegramInitDataString === "") {
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Missing Telegram init data in createTRPCContext"
		})
	}

	return {
		...opts,
		telegramInitDataString
	}
}

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof z.ZodError
						? error.cause.flatten((issue) => issue.message)
						: null
			}
		}
	}
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now()

	if (t._config.isDev) {
		// artificial delay in dev
		const waitMs = Math.floor(Math.random() * 400) + 100
		await new Promise((resolve) => setTimeout(resolve, waitMs))
	}

	const result = await next()

	const end = Date.now()
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

	return result
})

export const publicProcedure = t.procedure.use(timingMiddleware)

export const telegramInitDataRawMiddleware = t.middleware(
	async ({ ctx, next }) => {
		if (!ctx.telegramInitDataString) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Missing Telegram init data in telegramInitDataRawMiddleware"
			})
		}

		return next({
			ctx: {
				...ctx,
				telegramInitDataRaw: ctx.telegramInitDataString
			}
		})
	}
)

export const telegramInitDataParsedMiddleware = t.middleware(
	async ({ ctx, next }) => {
		if (!ctx.telegramInitDataString) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message:
					"Missing Telegram init data in telegramInitDataParsedMiddleware"
			})
		}

		const initDataString = ctx.telegramInitDataString

		const initDataResult = Result.fromThrowable(
			() => parse(initDataString),
			(error) => {
				console.error("[Auth] Error parsing init data", error)
				return {
					type: "bad_request",
					message: `Error parsing init data: ${error instanceof Error ? error.message : "Unknown init data parsing error"}`
				} as const
			}
		)()

		return initDataResult.match(
			async (initData) =>
				next({
					ctx: {
						...ctx,
						telegramInitDataParsed: initData
					}
				}),
			(error) => {
				console.error("[Auth] Error in telegramInitDataParsedMiddleware", error)
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: error.message
				})
			}
		)
	}
)

export const telegramInitDataValidatedMiddleware = t.middleware(
	async ({ ctx, next }) => {
		if (!ctx.telegramInitDataString) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message:
					"Missing Telegram init data in telegramInitDataValidatedMiddleware"
			})
		}

		const initDataString = ctx.telegramInitDataString

		const initDataResult = Result.fromThrowable(
			() => validate(initDataString, env.BOT_TOKEN),
			(error) => {
				console.error("[Auth] Error validating init data", error)
				return {
					type: "bad_request",
					message: `Error validating init data: ${error instanceof Error ? error.message : "Unknown init data validation error"}`
				} as const
			}
		)().andThen(() =>
			Result.fromThrowable(
				() => parse(initDataString),
				(error) => {
					console.error("[Auth] Error parsing init data", error)
					return {
						type: "bad_request",
						message: `Error parsing init data: ${error instanceof Error ? error.message : "Unknown init data parsing error"}`
					} as const
				}
			)()
		)

		return initDataResult.match(
			async (initData) =>
				next({
					ctx: {
						...ctx,
						telegramInitDataValidated: initData
					}
				}),
			(error) => {
				console.error(
					"[Auth] Error in telegramInitDataValidatedMiddleware",
					error
				)
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: error.message
				})
			}
		)
	}
)

export const telegramInitDataRawProcedure = t.procedure
	.use(timingMiddleware)
	.use(telegramInitDataRawMiddleware)

export const telegramInitDataParsedProcedure = t.procedure
	.use(timingMiddleware)
	.use(telegramInitDataParsedMiddleware)

export const telegramInitDataValidatedProcedure = t.procedure
	.use(timingMiddleware)
	.use(telegramInitDataValidatedMiddleware)

export const telegramInitDataProcedure = telegramInitDataValidatedProcedure
