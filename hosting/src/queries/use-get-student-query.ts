import { studentSchema } from '@/models/student-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetStudentQuery(id: number | undefined | null) {
  return useQuery({
    queryKey: ['get-student', id],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/${id}`)
      const student = studentSchema.parse(data)

      return student
    },
    enabled: !!id,
  })
}
