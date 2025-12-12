"use client"

import {
	backButton,
	init,
	miniApp,
	swipeBehavior,
	viewport
} from "@tma.js/sdk-react"
import type { PropsWithChildren, ReactNode } from "react"
import { useState } from "react"
import { useClientOnce } from "@/lib/hooks/use-client-once"

const CSS_VAR_PREFIX = "my-prefix"

export const TelegramSDKProvider = ({
	children
}: PropsWithChildren): ReactNode => {
	const [error, setError] = useState<Error | null>(null)

	if (error) throw error

	useClientOnce(() => {
		init()

		miniApp.mount()
		miniApp.ready()

		backButton.mount()

		const mountViewport = async () => {
			console.log("mountViewport")
			if (viewport.mount.isAvailable() && !viewport.isMounted()) {
				await viewport.mount()

				if (viewport.bindCssVars.isAvailable()) {
					viewport.bindCssVars((key) => `--${CSS_VAR_PREFIX}-${key}`)
				}

				if (viewport.expand.isAvailable()) {
					viewport.expand()
				}

				if (swipeBehavior.mount.isAvailable()) {
					swipeBehavior.mount()
					swipeBehavior.disableVertical()
				}
			}
		}

		mountViewport().catch(setError)
	})

	return children
}
