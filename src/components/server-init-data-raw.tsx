"use client"

import { CircleAlertIcon } from "lucide-react"
import { api } from "@/components/providers/trpc-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"

export const ServerInitDataRaw = () => {
	const {
		data: telegramInitData,
		isPending,
		error
	} = api.initData.getTelegramInitDataRaw.useQuery(undefined, {
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
			<Label className="text-lg font-semibold">Server (Raw)</Label>
			<Card className="w-full max-w-md py-2">
				<CardContent className="px-3 py-2">
					<div className="space-y-1.5 text-sm">
						<div className="flex flex-col gap-2">
							<span className="text-muted-foreground shrink-0">
								Raw Init Data:
							</span>
							<span className="font-mono text-xs break-all">
								{telegramInitData.initData}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
