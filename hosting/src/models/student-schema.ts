import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const studentSchema = z.object({
  id: z.string(),
  ref: docRefSchema,
  classes: z.array(docRefSchema),
})

export type Student = z.infer<typeof studentSchema>
