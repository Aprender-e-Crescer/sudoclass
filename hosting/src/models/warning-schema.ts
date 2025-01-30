import { z } from 'zod'

export const warningsSchema = z.object({
  sentBy: z.string(),
  message: z.string(),
 sentDate: z.date(),
})

export type Warning = z.infer<typeof warningsSchema>
