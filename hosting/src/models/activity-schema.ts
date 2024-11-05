import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const activitySchema = z.object({
  id: z.string(),
  title: z.string(),
  instruction: z.string(),
  deliveryDate: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }, z.date()),
  datePosting: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }, z.date()),
})

export type Activity = z.infer<typeof activitySchema>
