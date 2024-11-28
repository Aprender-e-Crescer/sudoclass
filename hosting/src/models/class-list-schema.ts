import { z } from 'zod'

export const classListSchema = z.preprocess(
  (obj: any) => ({
    id_curso: obj?.id_curso,
    id_turma: obj?.id_turma,
    name: obj?.nome_turma,
    shift: obj?.turno,
    numberOfHours: obj?.carga_horaria,
    totalVacancies: obj?.vagasinscricoes,
    released: obj?.released,
    completed: obj?.completed,
    endPrediction: obj?.datafim,
    registrationEndDate: obj?.datafinalinscricao,
    startForecast: obj?.datainicio,
  }),
  z.object({
    id_curso: z.number(),
    id_turma: z.number(),
    name: z.string().min(3, "O campo 'Nome' é obrigatório"),
    shift: z.string().min(1, "O campo 'Turno' é obrigatório"),
    numberOfHours: z.number().int(),
    totalVacancies: z.number().positive("O campo 'Total de vagas' é obrigatório").int('o numero deve ser inteiro'),
    released: z.boolean({ message: 'Este campo é obrigatório' }),
    completed: z.boolean({ message: 'Este campo é obrigatório' }),
    endPrediction: z.string(),
    registrationEndDate: z.string(),
    startForecast: z.string(),
  }),
)

export type classes = z.infer<typeof classListSchema>