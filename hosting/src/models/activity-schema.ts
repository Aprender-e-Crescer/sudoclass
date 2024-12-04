import { z } from 'zod'

export const activitySchema = z.preprocess(
  (obj: any) => ({
    id: obj?.id_atividade,
    title: obj?.titulo,
    instruction: obj?.descricao,
    value: obj?.valor,
    deliveryDate: obj?.data_entrega,
    datePosting: obj?.data_postagem ?? undefined,
    subjectId: obj?.id_materia,
    attachment: obj?.anexo,
  }),
  z.object({
    id: z.number(),

    title: z
      .string()
      .min(1, 'O título não pode ser nulo')
      .max(100, 'O título pode ter no máximo 100 caracteres')
      .nonempty('O título é obrigatório'),

    instruction: z
      .string()
      .min(1, 'As instruções não podem serem nulas')
      .max(500, 'As instruções podem ter no máximo 500 caracteres')
      .nonempty('As instruções são obrigatórias'),

    value: z.string().transform((val) => parseFloat(val)),

    deliveryDate: z
      .union([z.string(), z.undefined()])
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),

    datePosting: z
      .union([z.string(), z.undefined()])
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),

    subjectId: z
      .number()
      .nonnegative('O ID da matéria não pode ser negativo')
      .int('O ID da matéria deve ser um número inteiro'),
    attachment: z.string().optional().nullable(),
  }),
)

export type Activity = z.infer<typeof activitySchema>
