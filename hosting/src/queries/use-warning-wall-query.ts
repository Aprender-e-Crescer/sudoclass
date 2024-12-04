import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const WARNING_WALL_QUERY = ['warnings']

export function useListWarningsQuery(idSubject: string) {
  return useQuery({
    queryKey: [...WARNING_WALL_QUERY, idSubject],
    queryFn: async () => {
      try {
        const response = await api.get(`/warnings/${idSubject}`)
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
