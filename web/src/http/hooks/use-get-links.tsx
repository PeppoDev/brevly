import { useQuery } from '@tanstack/react-query'
import { getLinks } from '../services/get-links'

export function useGetLinks() {
	return useQuery({
		queryKey: ['links'],
		queryFn: () => getLinks(),
	})
}
