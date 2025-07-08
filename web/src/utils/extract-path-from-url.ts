export function extractPathFromUrl(url: string): string {
	const pathMatch = url.match(/^https?:\/\/(www\.)?[^\/]+\/(.+)$/)
	return pathMatch?.[2] ?? ''
}
