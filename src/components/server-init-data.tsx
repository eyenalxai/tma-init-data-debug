"use client"

import { CircleAlertIcon } from "lucide-react"
import { InitDataDisplay } from "@/components/init-data-display"
import { api } from "@/components/providers/trpc-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

export const ServerInitData = () => {
	const {
		data: telegramInitData,
		isPending,
		error
	} = api.stuff.getTelegramInitData.useQuery(undefined, {
		refetchInterval: 1000
	})

	if (isPending)
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	if (error)
		return (
			<Alert variant="error">
				<CircleAlertIcon />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>{error.message}</AlertDescription>
			</Alert>
		)

	return (
		<div>
			<Label className="text-lg font-semibold">Server</Label>
			<InitDataDisplay initData={telegramInitData.initData} />
		</div>
	)
}
