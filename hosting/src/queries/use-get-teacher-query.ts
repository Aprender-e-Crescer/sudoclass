import { teacherSchema } from '@/models/teachers-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetTeacherQuery(id: number | undefined | null) {
  return useQuery({
    queryKey: ['get-teacher', id],
    queryFn: async () => {
      const { data } = await api.get(`/teacher/${id}`)
      const teacher = teacherSchema.parse(data)

      return teacher
    },
    enabled: !!id,
  })
}
