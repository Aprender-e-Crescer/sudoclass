import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const classSchema = z.object({
  name: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: z.date(),
  endDate: z.date(),
  subscriptionEndDate: z.date(),
  workload: z.number(),
  availableVacancies: z.number(),
  students: z.array(docRefSchema),
})

export type Class = z.infer<typeof classSchema>