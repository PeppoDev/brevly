import { Button } from '@/components/button'
import { useDeleteLink } from '@/http/hooks/use-delete-link'
import { buildUrl } from '@/utils/build-url'
import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router'

interface ListItemProps {
	id: string
	shortUrl: string
	originalUrl: string
	accessCount: number
}

export function ListItem({
	id,
	originalUrl,
	shortUrl,
	accessCount,
}: ListItemProps) {
	const { mutateAsync } = useDeleteLink()

	const shortUrlWithBase = buildUrl(shortUrl)

	function handleCopyToClipboard() {
		navigator.clipboard.writeText(shortUrlWithBase)
	}

	async function handleDeleteLink() {
		await mutateAsync(id)
	}

	return (
		<div className="flex items-center justify-between w-full py-3 px-0.5 border-b border-gray-200">
			<div className="flex flex-1 items-center gap-2">
				<div className="flex flex-1 flex-col">
					<Link
						to={`/${shortUrl}`}
						className="text-sm font-semibold text-blue-base"
					>
						{shortUrlWithBase}
					</Link>
					<span className="text-xs text-gray-500">{originalUrl}</span>
				</div>
				<span className="text-xs text-gray-500">{`${accessCount} acessos`}</span>
				<div className="flex items-center gap-2 flex-wrap">
					<Button
						variant="icon"
						icon={<CopyIcon size={16} className="text-gray-600" />}
						onClick={handleCopyToClipboard}
					/>
					<Button
						variant="icon"
						icon={<TrashIcon size={16} onClick={handleDeleteLink} />}
					/>
				</div>
			</div>
		</div>
	)
}
