import { z } from 'zod'

export const warningSchema = z.object({
  message: z.string(),
  sentBy: z.string(),
})

export type Warning = z.infer<typeof warningSchema>
