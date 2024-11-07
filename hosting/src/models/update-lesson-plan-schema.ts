import { z } from 'zod';

export const updateLessonPlanSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  data: z.string().min(1, 'Data é obrigatória'),
  horaInicio: z.string().min(1, 'Hora de início é obrigatória'),
  horaFim: z.string().min(1, 'Hora de fim é obrigatória'),
  conteudoFormativo: z.string().min(1, 'Conteúdo formativo é obrigatório'),
  metodologiaDeEnsino: z.string().min(1, 'Metodologia de ensino é obrigatória'),
  recursosDidaticos: z.string().min(1, 'Recursos didáticos são obrigatórios'),
});
