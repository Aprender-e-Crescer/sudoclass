import { DocumentReference, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const documentSchema = z.object({
  createdBy: z.custom(
    (createdBy) => {
      return createdBy instanceof DocumentReference
    },
    {
      message: "O campo 'createdBy' deve ser uma referência válida do Firestore.",
    },
  ),

  createdDate: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }, z.date()),

  name: z.string(),
})

export type Document = z.infer<typeof documentSchema>
