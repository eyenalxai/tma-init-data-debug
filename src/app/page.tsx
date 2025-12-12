"use client"

import { ClientInitData } from "@/components/client-init-data"
import { ServerInitData } from "@/components/server-init-data"

export default function Page() {
	return (
		<main className="container mx-auto max-w-md mt-12 space-y-8 px-4">
			<ClientInitData />
			<ServerInitData />
		</main>
	)
}
