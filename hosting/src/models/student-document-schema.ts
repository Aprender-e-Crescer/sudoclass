import { DocumentReference, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const documentSchema = z.object({
  createdby: z.custom((createdby) => {
    return createdby instanceof DocumentReference;
  }, {
    message: "O campo 'createdby' deve ser uma referência válida do Firestore.",
  }),

  creationDate: z.preprocess((value) => {
    if (value instanceof Timestamp) {
      return value.toDate();
    }
    return value;
  }, z.date()),

  student: z.custom((student) => {
    
    return student instanceof DocumentReference;
  }, {
    message: "O campo 'student' deve ser uma referência válida do Firestore.",
  }),

  name: z.string(),
})

export type Document = z.infer<typeof documentSchema>