import { DocumentReference } from 'firebase/firestore'
import { z } from 'zod'

export const changePasswordRequestSchema = z.object({
    newPasswordDefault: z.string().min(6, { message: 'A string deve conter no minimo 6 caracteres.' }),
    requestStatus: z.enum(['accepted', 'refused', 'pending']),
    student: z.any().refine(
      (student: object): student is DocumentReference => student instanceof DocumentReference,
    ),
  })
  
export type ChangeRequests = z.infer<typeof changePasswordRequestSchema>
  