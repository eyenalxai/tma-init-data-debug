"use client"

import { miniApp, useSignal } from "@tma.js/sdk-react"
import type { PropsWithChildren, ReactNode } from "react"
import { useEffect } from "react"

const oklchToHex = (oklch: string): string => {
	const canvas = document.createElement("canvas")
	canvas.width = 1
	canvas.height = 1
	const ctx = canvas.getContext("2d")
	if (!ctx) return "#000000"

	ctx.fillStyle = oklch
	ctx.fillRect(0, 0, 1, 1)
	const imageData = ctx.getImageData(0, 0, 1, 1).data
	const r = (imageData[0] ?? 0).toString(16).padStart(2, "0")
	const g = (imageData[1] ?? 0).toString(16).padStart(2, "0")
	const b = (imageData[2] ?? 0).toString(16).padStart(2, "0")
	return `#${r}${g}${b}`.toUpperCase()
}

export const TelegramColorProvider = ({
	children
}: PropsWithChildren): ReactNode => {
	const isSetHeaderAvailable = useSignal(miniApp.setHeaderColor.isAvailable)
	const isSetBgColorAvailable = useSignal(miniApp.setBgColor.isAvailable)

	useEffect(() => {
		const getColorFromCSS = (varName: string): string => {
			const style = getComputedStyle(document.documentElement)
			const oklchValue = style.getPropertyValue(varName).trim()
			return oklchToHex(oklchValue)
		}

		const color = getColorFromCSS("--background")

		if (isSetHeaderAvailable) {
			miniApp.setHeaderColor(color)
		}

		if (isSetBgColorAvailable) {
			miniApp.setBgColor(color)
		}
	}, [isSetHeaderAvailable, isSetBgColorAvailable])

	return children
}
