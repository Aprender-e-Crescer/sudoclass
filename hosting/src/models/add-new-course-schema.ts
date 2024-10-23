import { z } from 'zod'

export const addNewCourseSchema = z.object({
  name: z.string({ required_error: `Insira um nome válido` }).min(1, { message: 'Insira um valor válido' }),
  startDate: z.string({ required_error: `Insira uma data inicial` }).min(1, { message: 'Insira um valor válido' }),
  endDate: z.string({ required_error: `Insira uma data de termino` }).min(1, { message: 'Insira um valor válido' }),
  workload: z
    .string({ required_error: `Insira uma carga horaria total do curso` })
    .min(1, { message: 'Insira um valor válido' }),
  numberOfVacancies: z
    .string({ required_error: `Insira um número de vagas` })
    .min(1, { message: 'Insira um valor válido' }),
  endOfRegistration: z
    .string({ required_error: `Insira uma data final para o curso` })
    .min(1, { message: 'Insira um valor válido' }),
  startOfRegistration: z
    .string({ required_error: `Insira uma data inicial de inscrições` })
    .min(1, { message: 'Insira um valor válido' }),
})
