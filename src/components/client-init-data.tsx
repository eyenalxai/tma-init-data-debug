"use client"

import { parseInitDataQuery, retrieveRawInitData } from "@tma.js/sdk-react"
import { CircleAlertIcon } from "lucide-react"
import { InitDataDisplay } from "@/components/init-data-display"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export const ClientInitData = () => {
	const rawInitData = retrieveRawInitData()

	if (rawInitData === null || rawInitData === undefined || rawInitData === "")
		return (
			<Alert variant="error">
				<CircleAlertIcon />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>Init data is empty</AlertDescription>
			</Alert>
		)
	try {
		const parsedInitData = parseInitDataQuery(rawInitData)
		return <InitDataDisplay title="Client" initData={parsedInitData} />
	} catch (error) {
		console.error("Error parsing init data:", error)
		return (
			<Alert variant="error">
				<CircleAlertIcon />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>Error parsing init data</AlertDescription>
			</Alert>
		)
	}
}
