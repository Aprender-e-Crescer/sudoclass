import { z } from 'zod'

export const correctionSchema = z.object({
  value: z
    .number()
    .min(0, { message: 'Valor deve ser no mínimo 0.' })
    .max(10, { message: 'Valor não pode ser maior que 10.' }),
  title: z.string().min(1, 'O título é obrigatório'),
  instruction: z.string().min(1, 'As instruções são obrigatórias'),
  deliveryDate: z.string().optional(),
})

export type correction = z.infer<typeof correctionSchema>
