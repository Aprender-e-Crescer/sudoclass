import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const SUBJECTS_QUERY_KEY = ['subjects']

export function useListSubjectsQuery() {
  return useQuery({
    queryKey: SUBJECTS_QUERY_KEY,
    queryFn: async () => {
      try {
        const response = await api.get('/subject')
        return response.data || []
      } catch (error: any) {
        if (error.response?.status === 404) {
          return [] 
        }
        throw error 
      }
    },
    retry: false, 
  })
}
