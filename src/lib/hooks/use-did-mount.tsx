"use client"

import { useSyncExternalStore } from "react"

export const useDidMount = () => {
	return useSyncExternalStore(
		() => () => {}, // subscribe: no-op since the value never changes after mount
		() => true, // getSnapshot: always returns true on client after hydration
		() => false // getServerSnapshot: returns false during SSR
	)
}
