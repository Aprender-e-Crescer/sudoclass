import { z } from 'zod'

export const RegistrationAdminSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().length(11, 'CPF deve ter exatamente 11 dígitos'),
  senha: z.string().min(1, 'senha é obrigatório'),
})

export type RegistrationAdmin = z.infer<typeof RegistrationAdminSchema>
