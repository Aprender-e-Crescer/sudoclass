import { z } from 'zod';

export const subjectsSchema = z.object({
  name: z.string().min(2, { message: 'O nome da matéria não pode ser inferior a 2 letras' }),
  description: z.string().min(2, { message: 'A descrição da matéria não pode ser inferior a 2 letras' }),
  endDate: z.string().min(1, { message: 'Insira uma data valida' }),
  startDate: z.string().min(1, { message: 'Insira uma data valida' }),
  workload: z.string().min(1, { message: 'Insira uma hora valida' }),
  teacher: z.string().min(1, {message: 'insira um nome valido'})
});


export type Subject = z.infer<typeof subjectsSchema>;