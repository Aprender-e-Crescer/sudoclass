import { DocumentReference, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const documentSchema = z.object({
  createdby: z
    .any()
    .refine((createdby: object): createdby is DocumentReference => createdby instanceof DocumentReference),
  creationDate: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }, z.date()),
  student: z.any().refine((student: object): student is DocumentReference => student instanceof DocumentReference),
  name: z.string(),
})

export type Document = z.infer<typeof documentSchema>
