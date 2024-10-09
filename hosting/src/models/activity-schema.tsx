import { z } from 'zod'

export const activitySchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  age: z.number().positive('A idade deve ser um número positivo').int('A idade deve ser um número inteiro'),
})

export type Activity = z.infer<typeof activitySchema>;