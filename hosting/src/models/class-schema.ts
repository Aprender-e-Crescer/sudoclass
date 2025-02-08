import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const classSchema = z.object({
  id: z.string(),
  idCourse: z.string().optional(),
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
  idClass: z.string().optional(),
  name: z.string(),
  color: z.string(),
  shift: z.enum(['morning', 'afternoon', 'night']),
  startDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  endDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  subscriptionEndDate: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
  workload: z.number(),
  availableVacancies: z.number(),
  studentsProfile: z.array(z.any()),
})

export type Class = z.infer<typeof classSchema>

export const classSchemaToFirestore = classSchema.transform((data) => ({
  ...data,
  startDate: Timestamp.fromDate(data.startDate),
  endDate: Timestamp.fromDate(data.endDate),
  subscriptionEndDate: Timestamp.fromDate(data.subscriptionEndDate),
}))
