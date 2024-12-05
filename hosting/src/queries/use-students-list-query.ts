import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const STUDENTS_QUERY_KEY = ['students']

export function useStudentsListQuery() {
  return useQuery({
    queryKey: STUDENTS_QUERY_KEY,
    queryFn: async () => {
      try {
        const response = await api.get('/alunos')
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

