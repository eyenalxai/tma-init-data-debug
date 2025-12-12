import { Card, CardContent } from "@/components/ui/card"
import { Label } from "./ui/label"

type InitDataDisplayProps = {
	title: "Server" | "Client" | "Server (Parsed)" | "Server (Validated)"
	initData: {
		auth_date: Date | string
		hash?: string
		query_id?: string
		signature?: string
		user?: {
			first_name: string
			last_name?: string
			username?: string
		}
	}
}

export const InitDataDisplay = ({ title, initData }: InitDataDisplayProps) => {
	const { user, auth_date, query_id, hash, signature } = initData
	const fullName = user
		? [user.first_name, user.last_name].filter(Boolean).join(" ")
		: "Unknown User"
	const authDate = auth_date instanceof Date ? auth_date : new Date(auth_date)

	return (
		<div>
			<Label className="text-lg font-semibold">{title}</Label>
			<Card className="w-full max-w-md py-2">
				<CardContent className="px-3 py-2">
					<div className="space-y-0.5">
						<h3 className="font-semibold text-base leading-none truncate">
							{fullName}
						</h3>
						{user?.username !== undefined && user.username !== "" && (
							<p className="text-xs text-muted-foreground truncate">
								@{user.username}
							</p>
						)}
					</div>

					<div className="mt-2 space-y-1.5 text-sm">
						{query_id !== undefined && query_id !== "" && (
							<div className="flex items-center justify-between gap-2">
								<span className="text-muted-foreground shrink-0">
									Query ID:
								</span>
								<span className="font-mono text-xs truncate">{query_id}</span>
							</div>
						)}

						{hash !== undefined && hash !== "" && (
							<div className="flex items-center justify-between gap-2">
								<span className="text-muted-foreground shrink-0">Hash:</span>
								<span className="font-mono text-xs truncate">{hash}</span>
							</div>
						)}

						{signature !== undefined && signature !== "" && (
							<div className="flex items-center justify-between gap-2">
								<span className="text-muted-foreground shrink-0">
									Signature:
								</span>
								<span className="font-mono text-xs truncate">{signature}</span>
							</div>
						)}

						<div className="flex items-center justify-between gap-2">
							<span className="text-muted-foreground shrink-0">
								Authenticated:
							</span>
							<span className="text-xs truncate">
								{authDate.toLocaleString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit"
								})}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
