import { z } from 'zod'

export const DisciplineSyllabusSchema = z.object({
  ModeloDaDisciplina: z.string().optional(),
  CargaHoraria: z.string().optional(),
  Ementa: z.string().optional(),
})
export type DailyTeachingPlan = z.infer<typeof DisciplineSyllabusSchema>
