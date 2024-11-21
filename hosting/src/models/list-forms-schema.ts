import { z } from 'zod'

export const listFormsSchema = z.object({
  name: z.string().default('Nome não definido'),
  createdBy: z.string().default('Autor não definido'),
  createdDate: z
    .date()
    .transform((date) => date.toLocaleDateString('pt-BR'))
    .default(new Date()),
  link: z.string(),
})

export type ListForm = z.infer<typeof listFormsSchema>
