import { z } from 'zod'

export const subjectsSchema = z.preprocess(
  (obj) => ({
    id: obj?.id_materia,
    course: obj?.id_curso,
    teacher: obj?.id_professor,
    name: obj?.nome_materia,
    workload: obj?.carga_horaria_materia,
    startDate: obj?.datainicio,
    endDate: obj?.datafim,
    menu: obj?.ementa,
  }),
  z.object({
    id: z.number(),
    name: z.string(),
    endDate: z.string(),
    startDate: z.string(),
    workload: z.string(),
    teacher: z.number(),
    menu: z.string(),
    course: z.number(),
  }),
)

export type Subject = z.infer<typeof subjectsSchema>
