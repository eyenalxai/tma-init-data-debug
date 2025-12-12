"use client"

import type { PropsWithChildren, ReactNode } from "react"
import { useDidMount } from "@/lib/hooks/use-did-mount"

export const ClientRoot = ({ children }: PropsWithChildren): ReactNode => {
	const didMount = useDidMount()

	if (!didMount) return null

	return children
}
