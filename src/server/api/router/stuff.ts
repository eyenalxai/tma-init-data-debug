import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"

export const stuffRouter = createTRPCRouter({
	getPublicStuff: publicProcedure.query(() => {
		return {
			message: "Hello, world!"
		}
	})
})
