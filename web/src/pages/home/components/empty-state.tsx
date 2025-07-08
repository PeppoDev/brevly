import { LinkIcon } from '@phosphor-icons/react'

export function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 w-full [&>svg]:text-gray-400 mt-4">
			<LinkIcon size={32} />

			<p className="text-gray-500 text-sm">
				AINDA NÃO EXISTEM LINKS CADASTRADOS
			</p>
		</div>
	)
}
