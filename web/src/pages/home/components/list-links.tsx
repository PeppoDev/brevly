import { Button } from '@/components/button'
import { useGetLinks } from '@/http/hooks/use-get-links'
import { useGetReport } from '@/http/hooks/use-get-report'
import { downloadFileByUrl } from '@/utils/download-file-by-url'
import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { Card } from './card'
import { ListItem } from './lits-item'

export function ListLinks() {
	const { data } = useGetLinks()
	const { mutateAsync, isPending: isLoadingReport } = useGetReport()

	async function handleDownloadFile() {
		const { url } = await mutateAsync()
		downloadFileByUrl(url)
	}

	return (
		<Card className="max-w-[580px] w-full">
			<div className="w-full flex items-center justify-between border-b border-gray-300 pb-5">
				<h1 className="text-lg font-bold ">Meus links</h1>
				<Button
					variant="secondary"
					className="h-8"
					onClick={handleDownloadFile}
					icon={<DownloadSimpleIcon size={16} />}
					disabled={isLoadingReport}
				>
					Baixar CSV
				</Button>
			</div>
			{data?.content.map(link => (
				<ListItem
					key={link.id}
					id={link.id}
					originalUrl={link.originalUrl}
					shortUrl={link.shortUrl}
					accessCount={link.accessCount}
				/>
			))}
		</Card>
	)
}
