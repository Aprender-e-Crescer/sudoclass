import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const classSchema = z.object({
  id: z.string(),
  idCourse: z.string(),
  name: z.string(),
  color: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: z.preprocess((val) => (val instanceof Timestamp ? val.toDate() : val), z.date()),
  endDate: z.preprocess((val) => (val instanceof Timestamp ? val.toDate() : val), z.date()),
  subscriptionEndDate: z.preprocess((val) => (val instanceof Timestamp ? val.toDate() : val), z.date()),
  workload: z.number(),
  availableVacancies: z.number(),
  studentsProfile: z.array(docRefSchema),
})

export const classRegisterSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  endDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  subscriptionEndDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  workload: z.preprocess((val) => (typeof val === 'string' ? Number(val) : val), z.number()),
  availableVacancies: z.preprocess((val) => (typeof val === 'string' ? Number(val) : val), z.number()),
  studentsProfile: z.array(docRefSchema).optional(),
})

export type Class = z.infer<typeof classSchema>
