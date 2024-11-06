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
  dateOfBirth: z.preprocess((value) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date; 
    }
    return value;
  }, z.date().refine(date => date instanceof Date, { message: 'Insira uma data válida' })),
  email: z.string().email("Email inválido"),
  fullName: z.string().min(1, "O campo 'Nome completo' é obrigatório"),
  rgNumber: z.string().min(7, "RG deve ter no mínimo 7 dígitos"),
  rgDispatchStatus: z.string().min(1, "O campo 'Status de emissão do RG' é obrigatório"),
  rgDispatchDate: z.preprocess((value) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return value;
  }, z.date().refine(date => date instanceof Date, { message: 'Insira uma data válida' })),
  telephone: z.string().min(1, "O campo 'Telefone' é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  matter: z.instanceof(DocumentReference).refine(
    (provider): provider is DocumentReference => provider instanceof DocumentReference,
  ),
});

export type RegisterRequests = z.infer<typeof registerSchema>;
