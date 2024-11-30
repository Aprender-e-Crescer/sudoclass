import { z } from 'zod'

export const InputNoteSchema = z.object({
  value: z.preprocess(
    (value) => {
      const num = Number(value)
      return isNaN(num) ? undefined : num
    },
    z
      .number({
        required_error: 'Insira um número',
      })
      .min(1, { message: 'O valor mínimo é 1' })
      .max(10, { message: 'O valor máximo é 10' }),
  ),
})

export type InputNote = z.infer<typeof InputNoteSchema>
