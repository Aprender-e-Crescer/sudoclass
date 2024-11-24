import { registerSchema } from '@/models/teachers-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useTeachersListingQuery(idTeacher: string) {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await api.get(`/teacher/${idTeacher}`)
      const teachers = z.array(registerSchema).parse(data)

      return teachers
    },
  })
}