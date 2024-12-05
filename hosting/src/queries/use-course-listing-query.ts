import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useCursosListingQuery() {
  return useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const { data } = await api.get('/course')

      return data
    },
  })
}