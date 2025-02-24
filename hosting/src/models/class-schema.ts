import { datePreprocessedSchema, docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const classSchema = z.object({
  id: z.string(),
  ref: docRefSchema,
  idCourse: z.string(),
  name: z.string(),
  color: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: datePreprocessedSchema,
  endDate: datePreprocessedSchema,
  subscriptionEndDate: datePreprocessedSchema,
  workload: z.number(),
  availableVacancies: z.number(),
  studentsProfile: z.array(docRefSchema),
})

export type Class = z.infer<typeof classSchema>
