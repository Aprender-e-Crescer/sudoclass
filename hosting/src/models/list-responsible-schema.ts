import { z } from 'zod'

export const responsibleSchema = z.object({
  cpf: z.string({ required_error: `Insira um CPF valido` }),
  dateOfBirth: z.string({ required_error: `Insira uma data valida` }),
  email: z.string({ required_error: `Insira um email valido` }),
  name: z.string({ required_error: `Insira um name valido` }),
  rg: z.string({ required_error: `Insira um rg valido` }),
  telephone: z.string({ required_error: `Insira um telefone valido` }),
  address: z.object({
    city: z.string({ required_error: `Insira uma cidade valido` }),
    neighborhood: z.string({ required_error: `Insira um bairro valido` }),
    state: z.string({ required_error: `Insira um estado valido` }),
    street: z.string({ required_error: `Insira uma rua valida` }),
    streetNumber: z.number({ required_error: `Insira uma rua valida` }),
  }),
})

export const responsiblesSchema = z.array(responsibleSchema)
export type Responsible = z.infer<typeof responsibleSchema>
