// import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const warningsSchema = z.object({
  message: z.string(),
  // sentBy: z.array(docRefSchema),
  // sentDate: z.string(),
})

export type Warning = z.infer<typeof warningsSchema>
