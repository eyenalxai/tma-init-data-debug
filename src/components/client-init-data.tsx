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

	const parsedInitData = parseInitDataQuery(rawInitData)

	return <InitDataDisplay title="Client" initData={parsedInitData} />
}
