import { z } from 'zod'

export const loginSchema = z.object({
    cpf: z.string({message: "CPF invalido!"}).min(11, {message: "Digite um CPF valido!"}).max(14, {message: "Digite um CPF valido!"}),
    password: z.string({message: "Senha invalida!"}).min(8,{message: "Sua senha deve ter pelo menos oito catacteres!"}),
  })

  export type UserLogin = z.infer< typeof loginSchema>;

  
