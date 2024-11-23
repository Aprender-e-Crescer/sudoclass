import { teacherSchema } from '@/models/teachers-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useTeachersListingQuery() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await api.get('/teacher')
      const teachers = z.array(teacherSchema).parse(data)

      return teachers
    },
  })
}
