import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const classSchema = z.object({
  name: z.string(),
  color: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: z.instanceof(Timestamp).transform((ts) => ts.toDate()),
  endDate: z.instanceof(Timestamp).transform((ts) => ts.toDate()),
  subscriptionEndDate: z.instanceof(Timestamp).transform((ts) => ts.toDate()),
  workload: z.number(),
  availableVacancies: z.number(),
  students: z.array(docRefSchema),
})

export type Class = z.infer<typeof classSchema>
