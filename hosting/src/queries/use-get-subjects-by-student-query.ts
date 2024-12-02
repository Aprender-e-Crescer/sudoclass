import { subjectsSchema } from '@/models/subjects-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useGetSubjectsByStudentQuery(id: number | null | undefined) {
  return useQuery({
    queryKey: ['get-subject-by-student', id],
    queryFn: async () => {
      const { data } = await api.get(`/subject/subjectsByStudent/${id}`)
      const subjects = z.array(subjectsSchema).parse(data)

      return subjects
    },
  })
}
