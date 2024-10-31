import { z } from 'zod'

export const activitySchema = z.object({
  title: z.string(),
  description: z.string(),
  valueActivity: z.number(),
  deliveryDate: z.date(),
  datePosting: z.date(),
})

export type Activity = z.infer<typeof activitySchema>
