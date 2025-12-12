"use client"

import { CircleAlertIcon } from "lucide-react"
import { api } from "@/components/providers/trpc-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

export default function Page() {
	const {
		data: telegramInitData,
		isPending,
		error
	} = api.stuff.getTelegramInitData.useQuery(undefined, {
		refetchInterval: 1000
	})

	if (isPending) return <Spinner />
	if (error)
		return (
			<Alert variant="error">
				<CircleAlertIcon />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					Describe what can be done about it here.
				</AlertDescription>
			</Alert>
		)

	return (
		<main>
			<h1>{JSON.stringify(telegramInitData)}</h1>
		</main>
	)
}
