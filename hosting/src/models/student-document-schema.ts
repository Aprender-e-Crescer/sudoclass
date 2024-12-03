import { z } from 'zod'

export const documentSchema = z.object({
  id_documentoalunos: z.number(),
  id_aluno: z.number(),
  nome: z.string(),
})

export type Document = z.infer<typeof documentSchema>
