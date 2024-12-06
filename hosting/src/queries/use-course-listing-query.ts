import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'


export const COURSES_QUERY_KEY = ['course']


export function useCourseListingQuery() {
  return useQuery({
    queryKey: COURSES_QUERY_KEY,
    queryFn: async () => {
      try {
        const { data } = await api.get('/course')
        return data
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
