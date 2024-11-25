import { z } from 'zod'

export const activitySchema = z.preprocess(
  (obj: any) => ({
    id: obj?.id_atividade,
    title: obj?.titulo,
    instruction: obj?.descricao,
    value: obj?.valor,
    deliveryDate: obj?.data_entrega,
    datePosting: obj?.data_postagem,
  }),
  z.object({
    id: z.number(),

    title: z
      .string()
      .min(3, 'O título precisa ter no mínimo 3 caracteres')
      .max(100, 'O título pode ter no máximo 100 caracteres')
      .nonempty('O título é obrigatório'),

    instruction: z
      .string()
      .min(5, 'As instruções precisam ter no mínimo 5 caracteres')
      .max(500, 'As instruções podem ter no máximo 500 caracteres')
      .nonempty('As instruções são obrigatórias'),

    value: z.string(),

    deliveryDate: z.string().transform((val) => new Date(val)),
    datePosting: z.string().transform((val) => new Date(val)),
  }),
)

export type Activity = z.infer<typeof activitySchema>
