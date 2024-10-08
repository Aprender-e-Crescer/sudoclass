import { z } from 'zod'

export const matriceSchema = z.object({
  name: z.string().min(2, { message: 'O nome não pode ser inferior a 2 caracteres' }),
  numberOfClasses: z.number({ required_error: 'O campo deve ser um número' }),
  workload: z.number({ required_error: 'O campo deve ser um número' }),
})

export const matricesSchema = z.array(matriceSchema)

export type Matrice = z.infer<typeof matriceSchema>
