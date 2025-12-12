import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
	server: {
		BOT_TOKEN: z.string(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development")
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.url()
	},
	runtimeEnv: {
		BOT_TOKEN: process.env.BOT_TOKEN,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
	},
	skipValidation: process.env.BUILD_TIME?.toLowerCase() === "true"
})
