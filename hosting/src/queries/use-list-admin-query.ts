import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const PEDAGOGUES_QUERY_KEY = ['pedagogues']

export function usePedagogueListQuery() {
  return useQuery({
    queryKey: PEDAGOGUES_QUERY_KEY,
    queryFn: async () => {
      try {
        const response = await api.get('/pedagogos')
        return response.data || []
      } catch (error: any) {
        if (error.response?.status === 404) {
          return [] 
        }
        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: true, 
  })
}