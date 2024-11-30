import { z } from 'zod'

export const pedagogueSchema = z.preprocess((obj) => ({
  idPedagogue: obj?.id_pedagogo,
  name: obj?.nome,
  cpf: obj?.cpf,
  password: obj?.senha,
  contact: obj?.contato,
}), z.object({
  idPedagogue: z.number(),
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  contact: z.string(),
}))

export type Pedagogue = z.infer<typeof pedagogueSchema>