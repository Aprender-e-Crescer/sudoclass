import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetSubjectByIdQuery(subjectId: number) {
  return useQuery({
    queryKey: ['getSubjectById', subjectId],
    queryFn: async () => {
      const { data } = await api.get(`/subject/${subjectId}`)
      console.log('subject_data:', data)
      return data
    },
  })
}
