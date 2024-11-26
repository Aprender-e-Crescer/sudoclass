import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const listFormsSchema = z.preprocess(
  (obj) => ({
    id: obj?.id,
    id_usuario: obj?.id_usuario,
    name: obj?.nome,
    createdBy: obj?.createdby,
    createdDate: obj?.data_criacao,
    link: obj?.link,
  }),
  z.object({
    id: z.number(),
    id_usuario: z.number(),
    name: z.string(),
    createdBy: z.string(),
    createdDate: datePreprocessedSchema,
    link: z.string(),
  }),
)

export type ListForm = z.infer<typeof listFormsSchema>
