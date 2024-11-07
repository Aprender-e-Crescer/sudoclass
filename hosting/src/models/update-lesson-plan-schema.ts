import { z } from 'zod';

export const updateLessonPlanSchema = z.object({
  data: z.string().min(8, 'A data é obrigatória.'),
  horaInicio: z.string().min(4, 'A hora de início é obrigatória.'),
  horaFim: z.string().min(4, 'A hora de fim é obrigatória.'),
  conteudoFormativo: z.string().min(3, 'O conteúdo formativo é obrigatório.'),
  metodologiaDeEnsino: z.string().min(3, 'A metodologia de ensino é obrigatória.'),
  recursosDidaticos: z.string().min(3, 'Os recursos didáticos são obrigatórios.'),
});

export type UpdateLessonPlan = z.infer<typeof updateLessonPlanSchema>;
