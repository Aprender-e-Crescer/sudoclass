import { studentSchema } from '@/models/student-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useStudentsListQuery() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await api.get('/alunos')
      return studentSchema.parse(data)
    },
  })
}