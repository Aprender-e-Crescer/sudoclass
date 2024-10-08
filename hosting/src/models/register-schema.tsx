
import { z } from 'zod'

export const registerSchema = z.object({
    municipality: z.string().nonempty("O campo 'Município' obrigatorio"),
    neighborhood: z.string().nonempty("O campo 'Bairro' obrigatorio"),
    number: z.string().nonempty("O campo 'Numero' obrigatorio"),
    road: z.string().nonempty("O campo 'Rua' obrigatorio"),
    state: z.string().nonempty("O campo 'Estado' obrigatorio"),
    birthCity: z.string().nonempty("O campo 'Cidade de nascimento' obrigatorio"),
    birthStatus: z.string().nonempty("O campo 'Estado civil' obrigatorio"),
    cpf: z.string().nonempty("O campo 'CPF' é obrigatório"),
    dateOfBirth: z.string().nonempty("O campo 'Data de nascimento' e obrigatorio"),
    email: z.string().email("Email invalido"),
    fullName: z.string().nonempty("O campo 'Nome completo' obrigatorio"),
    rgNumber: z.string().nonempty().min(7,"RG , no minimo 7 digitos "),
    rgDispatchStatus: z
      .string()
      .nonempty("O campo 'Status de emissão do RG' obrigatorio"),
    rgDispatchDate: z.string().nonempty("O campo 'Data de emissão do RG' obrigatorio"),
    telephone: z.string().nonempty("O campo 'Telefone' obrigatorio"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caractere"),
  });

  export type RegisterRequests = z.infer<typeof registerSchema>