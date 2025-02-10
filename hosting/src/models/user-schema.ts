import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  profileRef: docRefSchema,
  roleRef: docRefSchema,
  requireNewPassword: z.boolean(),
  fullName: z.string(),
}).transform((data) => ({ ...data, role: getRoleFromRef(data.roleRef) }))

export type User = z.infer<typeof userSchema>

export const userRequestChangePasswordSchema = z.preprocess(
  (obj) => ({
    idUser: obj?.id_usuario,
    studentName: obj?.nome_aluno,
    subjectName: obj?.nome_curso,
  }),
  z.object({
    idUser: z.number(),
    studentName: z.string(),
    subjectName: z.string(),
  }),
)

export type UserRequestChangePasswordSchema = z.infer<typeof userRequestChangePasswordSchema>
