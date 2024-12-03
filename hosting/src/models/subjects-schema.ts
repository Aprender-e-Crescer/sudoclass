import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const subjectsSchema = z.object({
  name: z.string().min(2, { message: 'O nome da matéria não pode ser inferior a 2 letras' }),
  description: z.string().min(2, { message: 'A descrição da matéria não pode ser inferior a 2 letras' }),
  startDate:  datePreprocessedSchema,
  endDate:  datePreprocessedSchema,
  workload: z.string().nonempty({ message: 'A carga horária não pode ser vazia' }).optional(),
  teacher: z.string().optional(),
  ementa: z.string().optional(),
})

export type Subject = z.infer<typeof subjectsSchema>
