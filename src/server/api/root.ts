import { initDataRouter } from "@/server/api/router/init-data"
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({
	initData: initDataRouter
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
