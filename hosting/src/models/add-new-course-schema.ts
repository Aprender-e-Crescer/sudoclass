import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const addNewCourseSchema = z.object({
  name: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
  startDate: datePreprocessedSchema,
  endDate: datePreprocessedSchema,
  workload: z
    .string({ message: `Insira uma carga horaria total do curso` })
    .min(1, { message: 'Insira um valor válido' }),
  numberOfVacancies: z.preprocess((value) => Number(value), z.number({ message: `Insira um número de vagas` }).min(1, { message: 'Insira um valor válido' })),
  endOfRegistration: datePreprocessedSchema,
  startOfRegistration: datePreprocessedSchema,
  ementa: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
})
