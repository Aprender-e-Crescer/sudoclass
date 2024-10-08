import { z } from 'zod'

export const matrizSchema = z.object({
  name: z.string().min(2, { message: 'O nome nao pode ser inferior a 2 caracteres' }),
  numberOfClasses: z.number({ required_error: 'O campo deve ser um numero' }),
  workload: z.number({ required_error: 'O campo deve ser um numero' }),
})

export const matricesSchema = z.array(matrizSchema)
