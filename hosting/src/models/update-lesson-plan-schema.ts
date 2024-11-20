import { z } from 'zod';

export const updateLessonPlanSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  timeStart: z.string().min(1, 'Hora de início é obrigatória'),
  timeEnd: z.string().min(1, 'Hora de fim é obrigatória'),
  trainingContent: z.string().min(1, 'Conteúdo formativo é obrigatório'),
  teachingMethodology: z.string().min(1, 'Metodologia de ensino é obrigatória'),
  teachingResources: z.string().min(1, 'Recursos didáticos são obrigatórios'),
});
