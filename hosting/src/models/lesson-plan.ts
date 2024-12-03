import { z } from 'zod'


export const lessonPlanSchema = z.object({
    id_planoaula: z.number(),
    id_professor: z.number(),
    id_turma: z.number(),
    id_materia: z.number(),
    data_aula: z.string(),
    inicio_aula: z.string(),
    fim_aula: z.string(),
    conteudoformativo: z.string(),
    mododeensino: z.string(),
    recursosdidaticos: z.string(),
  });

export type LessonPlan = z.infer<typeof lessonPlanSchema>;