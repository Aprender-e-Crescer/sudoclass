import { z } from 'zod'

export const commentSchema = z.object({
  message: z.string(),
  sentBy: z.string(),
})

export type Comment = z.infer<typeof commentSchema>
