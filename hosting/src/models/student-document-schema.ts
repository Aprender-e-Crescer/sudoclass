import { z } from 'zod'

export const documentSchema = z.object({
  nome: z.string(),
})

export type Document = z.infer<typeof documentSchema>
