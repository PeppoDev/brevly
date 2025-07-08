import { useQuery } from '@tanstack/react-query'
import { getLinkByShortUrl } from '../services/get-link-by-short-url'

export function useGetLinkByShortUrl(shortUrl: string) {
	return useQuery({
		queryKey: ['links', shortUrl],
		queryFn: () => getLinkByShortUrl(shortUrl),
	})
}
