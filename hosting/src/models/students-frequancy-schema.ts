import * as z from 'zod'

export const attendanceSchema = z.object({
  createdAt: z.string(),
  students: z.array(
    z.object({
      student: z.any(), // Ajuste de acordo com a estrutura de dados do aluno
      present: z.boolean(),
    }),
  ),
})

export type Attendance = z.infer<typeof attendanceSchema>
