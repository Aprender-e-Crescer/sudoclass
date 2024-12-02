import { subjectsSchema } from '@/models/subjects-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetSubjectQuery(id: number | null | undefined) {
  return useQuery({
    queryKey: ['getSubject'],
    queryFn: async () => {
      const { data } = await api.get(`/subject/${id}`)
      const subject = subjectsSchema.parse(data)
      return subject
    },
  })
}
