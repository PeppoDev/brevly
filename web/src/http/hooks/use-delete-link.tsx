import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { deleteLinkById } from '../services/delete-link-by-id'

export function useDeleteLink(): UseMutationResult<
	Awaited<ReturnType<typeof deleteLinkById>>,
	Error,
	string
> {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: id => deleteLinkById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['links'] })
		},
	})
}
