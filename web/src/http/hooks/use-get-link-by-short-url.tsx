import { type UseMutationResult, useMutation } from '@tanstack/react-query'
import { getLinkByShortUrl } from '../services/get-link-by-short-url'

export function useGetLinkByShortUrl(): UseMutationResult<
	Awaited<ReturnType<typeof getLinkByShortUrl>>,
	Error,
	string
> {
	return useMutation({
		mutationFn: shortUrl => getLinkByShortUrl(shortUrl),
	})
}
