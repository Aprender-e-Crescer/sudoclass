import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const responsibleSchema = z.object({
  responsibleFor: z.array(docRefSchema),
})

export type Responsible = z.infer<typeof responsibleSchema>