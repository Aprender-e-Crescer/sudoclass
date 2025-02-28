import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { datePreprocessedSchema, docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export type { CreateResponsibleData, UpdateResponsibleData, CreateAdminData, CreateStudentData, CreateTeacherData, UpdateAdminData, UpdateStudentData, UpdateTeacherData } from '../../../functions/src/schemas/users';

export const userSchema = z.object({
  id: z.string(),
  profileRef: docRefSchema,
  roleRef: docRefSchema,
  requireNewPassword: z.boolean(),
  fullName: z.string().nullable(),
  contact: z.object({
    email: z.string().email().nullable(),
    telephone: z.string().nullable(),
  }).optional(),
  address: z.object({
    state: z.string().nullable(),
    city: z.string().nullable(),
    street: z.string().nullable().optional(),
    neighborhood: z.string().nullable(),
    number: z.string().nullable(),
  }).optional(),
  birth: z.object({
    date: datePreprocessedSchema.nullable(),
    state: z.string().nullable(),
    city: z.string().nullable(),
  }).optional(),
  generalRegistration: z.object({
    number: z.string().nullable(),
    dispatch: z.object({
      date: datePreprocessedSchema.nullable(),
      state: z.string().nullable(),
    }),
  }).optional(),
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
