import { z } from 'zod'

export const userSchema = z.object({
  id_usuario: z.number(),
  id_aluno: z.number().optional(),
  id_professor: z.number().optional(),
  id_pedagogo: z.number().optional(),
  email: z.string(),
  senha: z.string(),
  tipo: z.string(),
})

export type User = z.infer<typeof userSchema>
