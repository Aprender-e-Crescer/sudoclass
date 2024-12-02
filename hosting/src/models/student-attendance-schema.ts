import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const studentAttendanceSchema = z.object({
  id_chamada: z.string(),
  id_materia: z.number(),
  data: datePreprocessedSchema,
  id_aluno: z.number(),
  status: z.boolean(),
  id_turma: z.number(),
  nome: z.string(),
})

export type StudentAttedance = z.infer<typeof studentAttendanceSchema>
