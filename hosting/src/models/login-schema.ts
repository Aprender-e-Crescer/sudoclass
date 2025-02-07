import { z } from '@/utils/zod';
import { type LoginData, loginDataSchema } from '../../../functions/src/schemas/login';
import { isValidCPF } from '../../../functions/src/utils/isValidCPF';

export const loginSchema = z.object({
  cpf: z.string().refine(isValidCPF, "Inválido"),
  password: z.string().min(1),
})

export type UserLogin = z.infer< typeof loginSchema>;
export { LoginData, loginDataSchema };