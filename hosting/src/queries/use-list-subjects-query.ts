import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useListSubjectsQuery() {
  return useQuery({
    queryKey: ['getSubjects'],
    queryFn: async () => {
      const { data } = await api.get('/subjects')
      return data
    },
  })
}
