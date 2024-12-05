import { z } from 'zod';

export const updateLessonPlanSchema = z.object({
  id_planoaula: z.string().min(1, 'ID do plano de aula é obrigatório'),
  id_professor: z.string(),
  id_turma: z.string(),
  id_materia: z.string(),
  data_aula: z.string().min(1, 'Data é obrigatória'),
  inicio_aula: z.string().min(1, 'Hora de início é obrigatória'),
  fim_aula: z.string().min(1, 'Hora de fim é obrigatória'),
  conteudoformativo: z.string().min(1, 'Conteúdo formativo é obrigatório'),
  mododeensino: z.string().min(1, 'Metodologia de ensino é obrigatória'),
  recursosdidaticos: z.string().min(1, 'Recursos didáticos são obrigatórios'),
});
