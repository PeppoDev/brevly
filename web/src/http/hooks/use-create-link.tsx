import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { type LinkPayload, createLink } from '../services/create-link'

export function useCreateLink(): UseMutationResult<
	Awaited<ReturnType<typeof createLink>>,
	Error,
	LinkPayload
> {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: payload => createLink(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] })
		},
	})
}
