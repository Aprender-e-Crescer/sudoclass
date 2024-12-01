import { DocumentReference, Timestamp } from 'firebase/firestore'
import { z } from 'zod'

export const subjectsSchema = z.object({
  name: z
    .string({ required_error: 'Obrigatório' })
    .min(2, { message: 'O nome da matéria não pode ser inferior a 2 letras' }),
  description: z
    .string({ required_error: 'Obrigatório' })
    .min(2, { message: 'A descrição da matéria não pode ser inferior a 2 letras' }),
  endDate: z
    .preprocess((value) => {
      if (value instanceof Timestamp) {
        return value.toDate()
      }

      return value
    }, z.string().date())
    .optional(),
  startDate: z
    .preprocess((value) => {
      if (value instanceof Timestamp) {
        return value.toDate()
      }
      return value
    }, z.string().date())
    .optional(),
  workload: z.number().min(1, { message: 'Insira uma hora valida' }).or(z.string()).optional(),
  teacher: z
    .any()
    .refine((teacher: object): teacher is DocumentReference => teacher instanceof DocumentReference)
    .optional(),
  menu: z.object({ objective: z.string(), methodology: z.string() }).optional(),
})

export type Subject = z.infer<typeof subjectsSchema>
