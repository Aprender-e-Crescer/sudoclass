import { z } from 'zod'

export const InputNoteSchema = z.object({
  value: z.preprocess(
    (value) => Number(value),
    z
      .number({
        required_error: 'Insira um número',
      })
      .min(1, { message: 'O valor mínimo é 1' })
      .max(100, { message: 'O valor máximo é 100' }),
  ),
})

export type InputNote = z.infer<typeof InputNoteSchema>
