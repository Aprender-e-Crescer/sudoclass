import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useCursosListingQuery() {
  return useQuery({
    queryKey: ['cursos'],
    queryFn: async () => {
      const { data } = await api.get('/curso')

      return data
    },
  })
}