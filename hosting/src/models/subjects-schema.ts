import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const subjectsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string(),
  workload: z.preprocess((val) => (typeof 'string' ? Number(val) : z.number()), z.number()),
  teacher: z.array(docRefSchema).optional(),
})

export type Subject = z.infer<typeof subjectsSchema>
