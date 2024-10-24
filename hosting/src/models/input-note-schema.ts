import { z } from 'zod'

export const InputNoteSchema = z.object({
  value: z.preprocess((value) => Number(value), z.number({ required_error: `Insira um número` })),
})

export type InputNote = z.infer<typeof InputNoteSchema>
