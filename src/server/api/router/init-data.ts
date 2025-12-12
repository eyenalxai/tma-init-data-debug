import {
	createTRPCRouter,
	telegramInitDataParsedProcedure,
	telegramInitDataRawProcedure,
	telegramInitDataValidatedProcedure
} from "@/server/api/trpc"

export const initDataRouter = createTRPCRouter({
	getTelegramInitDataRaw: telegramInitDataRawProcedure.query(({ ctx }) => {
		return {
			initData: ctx.telegramInitDataRaw
		}
	}),
	getTelegramInitDataParsed: telegramInitDataParsedProcedure.query(
		({ ctx }) => {
			return {
				initData: ctx.telegramInitDataParsed
			}
		}
	),
	getTelegramInitDataValidated: telegramInitDataValidatedProcedure.query(
		({ ctx }) => {
			return {
				initData: ctx.telegramInitDataValidated
			}
		}
	)
})
