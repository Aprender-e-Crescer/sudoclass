import { DocumentReference, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const documentSchema = z.object({
  createdby: z.unknown().refine(
    (createdby: unknown): createdby is DocumentReference => createdby instanceof DocumentReference
  ),
  creationDate: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate()
    }
    return value
  }, z.date()),
  student: z.unknown().refine(
    (student: unknown): student is DocumentReference => student instanceof DocumentReference
  ),
  name: z.string(),
})

export type Document = z.infer<typeof documentSchema>
