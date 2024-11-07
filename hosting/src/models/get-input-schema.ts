import { z } from 'zod'

export const getInputSchema = z.object({
  value: z.string().min(1, { message: 'Insira um valor válido' }),
})

export type Responsible = z.TypeOf<typeof getInputSchema>
