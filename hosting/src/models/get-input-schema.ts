import { z } from 'zod'

export const getInputSchema = z.object({
  value: z.string().nonempty({ message: 'Insira um valor válido' }),
})

export type Responsible = z.infer<typeof getInputSchema>;
