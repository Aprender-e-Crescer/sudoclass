import { z } from 'zod'

export const activitySchema = z.preprocess(
  (obj: any) => ({
    id: obj?.id_atividade,
    title: obj?.titulo,
    instruction: obj?.descricao,
    value: obj?.valor,
    deliveryDate: obj?.data_entrega,
    datePosting: obj?.data_postagem ?? undefined,
    subjectId: obj?.id_materia, // Aqui já deve estar no formato esperado
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

    value: z.string().transform((val) => parseFloat(val)), // Converte string para número

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
    // Converte para número
  }),
)

export type Activity = z.infer<typeof activitySchema>
