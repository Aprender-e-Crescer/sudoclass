import { datePreprocessedSchema, docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const warningsSchema = z.object({
  id: z.string(),
  message: z.string(),
  sentByProfile: docRefSchema,
  sentDate: datePreprocessedSchema,
})

export type Warning = z.infer<typeof warningsSchema>
