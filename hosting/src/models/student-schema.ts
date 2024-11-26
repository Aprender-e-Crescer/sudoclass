import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const studentSchema = z.preprocess((obj) => ({
  idStudent: obj.id_aluno,
  name: obj.nome,
  birthDate: obj.data_nasc,
  email: obj.email,
  state: obj.estado,
  city: obj.municipio,
  street: obj.rua,
  neighborhood: obj.bairro,
  number: obj.numero,
  rg: obj.rg,
  rgIssueDate: obj.datadeexpedicaorg,
  rgIssueState: obj.estadodeexpedicaorg,
  birthState: obj.estadonascimento,
  birthCity: obj.cidadenascimento,
  cpf: obj.cpf,
}), z.object({
  idStudent: z.number(),
  name: z.string(),
  birthDate: datePreprocessedSchema,
  email: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  rg: z.string(),
  rgIssueDate: z.string(),
  rgIssueState: z.string(),
  birthState: z.string(),
  birthCity: z.string(),
  cpf: z.string(),
}))

export type Student = z.infer<typeof studentSchema>