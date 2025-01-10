import { z } from '@/utils/zod';
import { isValidCPF, type LoginData, loginDataSchema } from '../../../functions/src/schemas/login';

export const loginSchema = z.object({
  cpf: z.string().refine(isValidCPF, "Inválido"),
  password: z.string().min(1),
})

export type UserLogin = z.infer< typeof loginSchema>;
export { LoginData, loginDataSchema };