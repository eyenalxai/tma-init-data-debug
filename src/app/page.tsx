"use client"

import { ClientInitData } from "@/components/client-init-data"
import { ServerInitDataParsed } from "@/components/server-init-data-parsed"
import { ServerInitDataRaw } from "@/components/server-init-data-raw"
import { ServerInitDataValidated } from "@/components/server-init-data-validated"

export default function Page() {
	return (
		<main className="container mx-auto max-w-md mt-12 space-y-8 px-4 pb-48">
			<ClientInitData />
			<ServerInitDataRaw />
			<ServerInitDataParsed />
			<ServerInitDataValidated />
		</main>
	)
}
