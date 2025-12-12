"use client"

import { CircleAlertIcon } from "lucide-react"
import { InitDataDisplay } from "@/components/init-data-display"
import { api } from "@/components/providers/trpc-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
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
		<main className="container mx-auto max-w-md mt-12 space-y-8">
			<div>
				<Label className="text-lg font-semibold">Server</Label>
				<InitDataDisplay initData={telegramInitData.initData} />
			</div>
			<div>
				<Label className="text-lg font-semibold">Server</Label>
				<InitDataDisplay initData={telegramInitData.initData} />
			</div>
		</main>
	)
}
