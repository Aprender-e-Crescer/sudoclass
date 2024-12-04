import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const creationClassSchema = z.object({
  class: z.string().min(4, { message: 'Insira um nome de turma válido.' }),
  shift: z.string().min(4, { message: 'Insira um válido.' }),
  startForecast: datePreprocessedSchema,
  endPrediction: datePreprocessedSchema,
  registrationFinalDate: datePreprocessedSchema,
  quantityHours: z.string().min(2, { message: `Insira um valor válido` }),
  totalVacancies: z.string().min(2, { message: `Insira um valor válido` }),
})

export type CreationClass = z.infer<typeof creationClassSchema>
