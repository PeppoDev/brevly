import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { incrementLinkAccessCount } from '../services/increment-link-access-count'

export function useIncrementLinkAccessCount(): UseMutationResult<
	Awaited<ReturnType<typeof incrementLinkAccessCount>>,
	Error,
	string
> {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: id => incrementLinkAccessCount(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] })
		},
	})
}
