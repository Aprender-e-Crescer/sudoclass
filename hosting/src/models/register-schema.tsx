import { z } from 'zod';

export const registerSchema = z.object({
  municipality: z.string().nonempty("O campo 'Município' é obrigatório").optional(),
  neighborhood: z.string().nonempty("O campo 'Bairro' é obrigatório").optional(),
  number: z.string().nonempty("O campo 'Número' é obrigatório").optional(),
  road: z.string().nonempty("O campo 'Rua' é obrigatório").optional(),
  state: z.string().nonempty("O campo 'Estado' é obrigatório").optional(),
  birthCity: z.string().nonempty("O campo 'Cidade de nascimento' é obrigatório").optional(),
  birthStatus: z.string().nonempty("O campo 'Estado civil' é obrigatório").optional(),
  cpf: z.string().nonempty("O campo 'CPF' é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  fullName: z.string().nonempty("O campo 'Nome completo' é obrigatório").optional(),
  rgNumber: z.string().nonempty().min(7, "RG deve ter no mínimo 7 dígitos").optional(),
  rgDispatchStatus: z.string().nonempty("O campo 'Status de emissão do RG' é obrigatório").optional(),
  rgDispatchDate: z.string().nonempty("O campo 'Data de emissão do RG' é obrigatório").optional(),
  telephone: z.string().nonempty("O campo 'Telefone' é obrigatório").optional(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional(),
  matter: z.any().optional(),
});
export type RegisterRequests = z.infer<typeof registerSchema>;