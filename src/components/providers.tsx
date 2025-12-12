"use client"

import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ClientRoot } from "@/components/client-root"
import { TelegramColorProvider } from "@/components/providers/telegram-color"
import { TelegramSDKProvider } from "@/components/providers/telegram-sdk"
import { TRPCReactProvider } from "@/components/providers/trpc-provider"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<TRPCReactProvider>
				<ClientRoot>
					<TelegramSDKProvider>
						<TelegramColorProvider>{children}</TelegramColorProvider>
					</TelegramSDKProvider>
				</ClientRoot>
			</TRPCReactProvider>
		</NextThemesProvider>
	)
}
