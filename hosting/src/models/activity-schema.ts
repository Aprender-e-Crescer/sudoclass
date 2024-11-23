import { z } from 'zod'
import { Timestamp } from 'firebase/firestore'

export const activitySchema = z.preprocess(
  (obj) => ({
    title: obj?.id_professor,
    instruction: obj?.instrucoes,
    value: obj?.valor,
    deliveryDate: obj?.data_entrega,
    datePosting: obj?.data_postagem,
  }),
  z.object({
    id: z.string(),

    title: z
      .string()
      .min(3, 'O título precisa ter no mínimo 3 caracteres')
      .max(100, 'O título pode ter no máximo 100 caracteres')
      .nonempty('O título é obrigatório'),

    instruction: z
      .string()
      .min(5, 'As instruções precisam ter no mínimo 5 caracteres')
      .max(500, 'As instruções podem ter no máximo 500 caracteres')
      .nonempty('As instruções são obrigatórias'),

    value: z
      .string()
      .regex(/^\d+$/, 'O valor precisa ser um número')
      .nonempty('O valor (peso) é obrigatório')
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 0, 'O valor não pode ser negativo')
      .refine((val) => val <= 100, 'O valor não pode ser maior que 100'),

    deliveryDate: z.preprocess(
      (value) => {
        if (value instanceof Timestamp) {
          return value.toDate()
        }
        return value
      },
      z.date().refine((val) => !isNaN(val.getTime()), 'A data de entrega é obrigatória'),
    ),

    datePosting: z.preprocess(
      (value) => {
        if (value instanceof Timestamp) {
          return value.toDate()
        }
        return value
      },
      z.date().refine((val) => !isNaN(val.getTime()), 'A data de postagem é obrigatória'),
    ),
  }),
)

export type Activity = z.infer<typeof activitySchema>
