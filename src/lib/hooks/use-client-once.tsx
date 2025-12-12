import { useEffect, useRef } from "react"

export const useClientOnce = (fn: () => void) => {
	const hasRun = useRef(false)
	const fnRef = useRef(fn)

	useEffect(() => {
		fnRef.current = fn
	})

	useEffect(() => {
		if (hasRun.current) {
			console.log("useClientOnce: skipping execution (already ran)")
		} else {
			console.log("useClientOnce: executing function (first run)")
			hasRun.current = true
			fnRef.current()
		}
	}, [])
}
