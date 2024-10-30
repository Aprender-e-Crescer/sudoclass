import { z } from 'zod'

export const addNewCourseSchema = z.object({
  name: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
  startDate: z.date({ message: `Insira uma data válida` }),
  endDate: z.date({ message: `Insira uma data válida` }),
  workload: z
    .number({ message: `Insira uma carga horaria total do curso` })
    .min(1, { message: 'Insira um valor válido' }),
  numberOfVacancies: z.number({ message: `Insira um número de vagas` }).min(1, { message: 'Insira um valor válido' }),
  endOfRegistration: z.date({ message: `Insira uma data válida` }),
  startOfRegistration: z.date({ message: `Insira uma data válida` }),
})
