import { studentAttendanceSchema } from '@/models/student-attendance-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useGetStudentAttendance(id: number | null | undefined) {
  return useQuery({
    queryKey: ['get-student-attendance', id],
    queryFn: async () => {
      const { data } = await api.get(`/schoolCall/getByStudent/${id}`)
      const studentAttendance = z.array(studentAttendanceSchema).parse(data)

      return studentAttendance
    },
  })
}
