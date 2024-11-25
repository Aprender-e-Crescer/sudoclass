import { z } from 'zod'

export const DisciplineSyllabusSchema = z.object({
  CargaHoraria: z.string().optional(),
  Ementa: z.string().optional(),
})
export type DailyTeachingPlan = z.infer<typeof DisciplineSyllabusSchema>
