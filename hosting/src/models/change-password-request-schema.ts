import { DocumentReference } from 'firebase/firestore'
import { z } from 'zod'

export const changePasswordRequestSchema = z.object({
  newPasswordDefault: z.string().min(6, { message: 'A string deve conter no mínimo 6 caracteres.' }),
  requestStatus: z.enum(['accepted', 'refused', 'pending']),
  student: z.instanceof(DocumentReference, { message: 'O campo student deve ser uma referência de documento válida.' })
})

export type ChangeRequests = z.infer<typeof changePasswordRequestSchema>;
