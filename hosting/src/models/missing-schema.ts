import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const missingSchema = z.object({
  id: z.string(),
  idLessonPlan: z.string(),
  studentProfile: docRefSchema,
})

export type Missing = z.infer<typeof missingSchema>
