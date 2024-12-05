import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'
 
export const studentSchema = z.object({

  address: z.object({
    city: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    street: z.string(),
    streetNumber: z.string(),
  }),
  cityOfBirth: z.string(),
  cpf: z.string(),
  dateOfBirth: z.string(),
  email: z.string().email(),
  name: z.string(),
  responsible: z.custom((responsible) => {
    return responsible instanceof DocumentReference;
  }, {
    message: "O campo 'responsible' deve ser uma referência válida do Firestore.",
  }),
 
  rg: z.string(),
  shippingDate: z.string(),
  shippingStatus: z.string(),
  stateOfBirth: z.string(),
  telephone: z.string(),
})
 
export type Student = z.infer<typeof studentSchema>
