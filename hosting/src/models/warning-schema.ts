import { z } from 'zod'

export const warningSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'O campo não pode ser em branco' })
    .max(500, { message: 'A mensagem deve ter no máximo 500 caracteres' }),
  sentBy: z.string(),
})

export type Warning = z.infer<typeof warningSchema>
