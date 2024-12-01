import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const studentSchema = z.preprocess(
  (obj) => ({
    id: obj?.id_aluno,
    address: {
      city: obj?.municipio,
      neighborhood: obj?.bairro,
      state: obj?.estado,
      street: obj?.rua,
      streetNumber: obj?.numero,
    },
    cityOfBirth: obj?.cidadenascimento,
    cpf: obj?.cpf,
    dateOfBirth: obj?.data_nasc,
    email: obj?.email,
    name: obj?.nome,
    rg: obj?.rg,
    shippingDate: obj?.datadeexpedicaorg,
    shippingStatus: obj?.estadodeexpedicaorg,
    stateOfBirth: obj?.estadonascimento,
    course: obj?.id_curso,
  }),
  z.object({
    id: z.number(),
    address: z.object({
      city: z.string(),
      neighborhood: z.string(),
      state: z.string(),
      street: z.string(),
      streetNumber: z.string(),
    }),
    cityOfBirth: z.string(),
    cpf: z.string(),
    dateOfBirth: datePreprocessedSchema,
    email: z.string(),
    name: z.string(),
    rg: z.string(),
    shippingDate: z.string(),
    shippingStatus: z.string(),
    stateOfBirth: z.string(),
    course: z.number(),
  }),
)

export type Student = z.infer<typeof studentSchema>
