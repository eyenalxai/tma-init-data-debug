import { Card, CardContent } from "@/components/ui/card"

type InitDataDisplayProps = {
	initData: {
		auth_date: Date | string
		hash?: string
		query_id?: string
		signature?: string
		user?: {
			allows_write_to_pm?: boolean
			first_name: string
			id: number
			last_name?: string
			language_code?: string
			photo_url?: string
			username?: string
		}
	}
}

export const InitDataDisplay = ({ initData }: InitDataDisplayProps) => {
	const { user, auth_date, query_id, hash, signature } = initData
	const fullName = user
		? [user.first_name, user.last_name].filter(Boolean).join(" ")
		: "Unknown User"
	const authDate = auth_date instanceof Date ? auth_date : new Date(auth_date)

	return (
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
					{user && (
						<div className="flex items-center justify-between gap-2">
							<span className="text-muted-foreground shrink-0">User ID:</span>
							<span className="font-mono text-xs truncate">{user.id}</span>
						</div>
					)}

					{query_id !== undefined && query_id !== "" && (
						<div className="flex items-center justify-between gap-2">
							<span className="text-muted-foreground shrink-0">Query ID:</span>
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
							<span className="text-muted-foreground shrink-0">Signature:</span>
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

					{user?.language_code !== undefined && user.language_code !== "" && (
						<div className="flex items-center justify-between gap-2">
							<span className="text-muted-foreground shrink-0">Language:</span>
							<span className="text-xs truncate">
								{user.language_code.toUpperCase()}
							</span>
						</div>
					)}

					{user && typeof user.allows_write_to_pm === "boolean" && (
						<div className="flex items-center justify-between gap-2">
							<span className="text-muted-foreground shrink-0">
								Write to PM:
							</span>
							<span className="text-xs truncate">
								{user.allows_write_to_pm ? "Allowed" : "Not Allowed"}
							</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
