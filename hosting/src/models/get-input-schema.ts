import { z } from 'zod'

export const getInputSchema = z.object({
  value: z.string({ required_error: `Insira um valor valido` }),
})

export type Responsible = z.infer<typeof getInputSchema>
