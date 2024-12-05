import { z } from 'zod';

export const RegistrationAdminSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().length(11, 'CPF deve ter exatamente 11 dígitos'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  contato: z.string().min(1, 'Contato e  obrigatorio') ,
});

export type PedagogueRegistration = z.infer<typeof RegistrationAdminSchema>;
