import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const submitsSchema = z.object({
  id: z.string(),
  note: z.number().nullable(),
  evaluated: z.boolean(),
  studentProfile: docRefSchema,
})

export type Submit = z.infer<typeof submitsSchema>
