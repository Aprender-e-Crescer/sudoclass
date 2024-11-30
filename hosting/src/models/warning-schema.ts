import { z } from 'zod'

export const warningSchema = z.preprocess(
  (obj: any) => ({
    id: obj?.id_aviso,
    subjectId: obj?.id_materia,
    message: obj?.mensagem,
    userId: obj?.id_usuario,
  }),
  z.object({
    id: z.number().optional(),
    subjectId: z.number(),
    userId: z.number(),
    message: z
      .string()
      .min(1, { message: 'O campo não pode ser em branco' })
      .max(500, { message: 'A mensagem deve ter no máximo 500 caracteres' }),
  }),
)

export type WarningType = z.infer<typeof warningSchema>
