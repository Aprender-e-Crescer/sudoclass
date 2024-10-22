import { z } from 'zod'

export const subjectsSchema = z.object({
  name: z.string().min(2, { message: 'O nome da matéria não pode ser inferior que 2 letras' }),
  description: z.string().min(2, { message: 'A descrição da matéria não pode ser inferior que 2 letras' }),
})

export type Subject = z.infer<typeof subjectsSchema>
