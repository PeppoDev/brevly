import { useMutation } from '@tanstack/react-query'
import { getReport } from '../services/get-report'

export function useGetReport() {
	return useMutation({
		mutationFn: () => getReport(),
	})
}
