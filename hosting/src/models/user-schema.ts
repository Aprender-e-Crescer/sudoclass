import { z } from 'zod'

export const userSchema = z.preprocess((obj) => ({
  idUser: obj?.id_usuario,
  idStudent: obj?.id_aluno,
  idTeacher: obj?.id_professor,
  idPedagogue: obj?.id_pedagogo,
  email: obj?.email,
  password: obj?.senha,
  type: obj?.tipo,
}), z.object({
  idUser: z.number(),
  idStudent: z.number().nullable(),
  idTeacher: z.number().nullable(),
  idPedagogue: z.number().nullable(),
  email: z.string(),
  password: z.string(),
  type: z.enum(['aluno', 'professor', 'pedagogo']),
}))

export type User = z.infer<typeof userSchema>
