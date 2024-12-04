import { z } from 'zod'

export const userSchema = z.preprocess((obj) => ({
  idUser: obj?.id_usuario,
  idStudent: obj?.id_aluno,
  idTeacher: obj?.id_professor,
  idPedagogue: obj?.id_pedagogo,
  email: obj?.email,
  password: obj?.senha,
  type: obj?.tipo,
  changedPassword: obj?.trocardesenha,
}), z.object({
  idUser: z.number(),
  idStudent: z.number().nullable(),
  idTeacher: z.number().nullable(),
  idPedagogue: z.number().nullable(),
  email: z.string(),
  password: z.string(),
  type: z.enum(['aluno', 'professor', 'pedagogo']),
  changedPassword: z.boolean()
}))

export type User = z.infer<typeof userSchema>

export const userRequestChangePasswordSchema = z.preprocess((obj) => ({
  idUser: obj?.id_usuario,
  studentName: obj?.nome_aluno,
  subjectName: obj?.nome_curso,
}), z.object({
  idUser: z.number(),
  studentName: z.string(),
  subjectName: z.string(),
}))

export type UserRequestChangePasswordSchema = z.infer<typeof userRequestChangePasswordSchema>
