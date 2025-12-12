"use client"

import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ClientRoot } from "@/components/client-root"
import { TRPCReactProvider } from "@/components/providers/trpc-provider"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<TRPCReactProvider>
				<ClientRoot>{children}</ClientRoot>
			</TRPCReactProvider>
		</NextThemesProvider>
	)
}
