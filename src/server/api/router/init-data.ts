import { createTRPCRouter, telegramInitDataProcedure } from "@/server/api/trpc"

export const initDataRouter = createTRPCRouter({
	getTelegramInitData: telegramInitDataProcedure.query(({ ctx }) => {
		return {
			initData: ctx.telegramInitData
		}
	})
})
