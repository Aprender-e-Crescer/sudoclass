import { z } from 'zod'

export const addNewCourseSchema = z.object({
  name: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
  syllabus: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
  workload: z
    .number({ required_error: `Insira uma carga horaria valida` })
    .min(1, { message: 'Insira uma carga horaria valida' }),
})

export type Course = z.infer<typeof addNewCourseSchema>
