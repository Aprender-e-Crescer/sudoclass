import { DocumentReference } from 'firebase/firestore'
import { z } from 'zod'

export const registerSchema = z.object({
  municipality: z.string().min(1, "O campo 'Município' é obrigatório"),
  neighborhood: z.string().min(1, "O campo 'Bairro' é obrigatório"),
  number: z.string().min(1, "O campo 'Número' é obrigatório"),
  road: z.string().min(1, "O campo 'Rua' é obrigatório"),
  state: z.string().min(1, "O campo 'Estado' é obrigatório"),
  birthCity: z.string().min(1, "O campo 'Cidade de nascimento' é obrigatório"),
  birthStatus: z.string().min(1, "O campo 'Estado civil' é obrigatório"),
  cpf: z.string().min(1, "O campo 'CPF' é obrigatório"),
  dateOfBirth: z.preprocess((value) => value, z.date(), { message: 'Insira uma data valida' }),
  email: z.string().email('Email inválido'),
  fullName: z.string().min(1, "O campo 'Nome completo' é obrigatório"),
  rgNumber: z.string().min(7, 'RG deve ter no mínimo 7 dígitos'),
  rgDispatchStatus: z.string().min(1, "O campo 'Status de emissão do RG' é obrigatório"),
  rgDispatchDate: z.preprocess((value) => value, z.date(), { message: 'Insira uma data valida' }),
  telephone: z.string().min(1, "O campo 'Telefone' é obrigatório"),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  matter: z.custom(
    (matter) => {
      return matter instanceof DocumentReference
    },
    {
      message: "O campo 'matter' deve ser uma referência válida do Firestore.",
    },
  ),
})

export const listTeacherSchema = z.object({
  birthCity: z.string(),
  birthStatus: z.string(),
  cpf: z.string(),
  email: z.string(),
  fullName: z.string(),
  municipality: z.string(),
  neighborhood: z.string(),
  number: z.number().or(z.string()),
  password: z.string(),
  profilePhoto: z.string(),
  rgDispatchDate: z.string(),
  rgDispatchStatus: z.string(),
  rgNumber: z.number(),
  state: z.string(),
  street: z.string(),
  telephone: z.number(),
})

export type RegisterRequests = z.infer<typeof registerSchema>
