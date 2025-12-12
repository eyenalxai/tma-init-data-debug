"use client"

import { CircleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type GlobalErrorPageProps = {
	error: Error
}

export default function GlobalErrorPage({ error }: GlobalErrorPageProps) {
	return (
		<html lang="en">
			<body className={cn("font-sans", "antialiased")}>
				<Alert variant="error">
					<CircleAlertIcon />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>
						{error instanceof Error
							? error.message
							: "An unknown error occurred"}
					</AlertDescription>
				</Alert>
			</body>
		</html>
	)
}
