import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const subjectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  workload: z.number(),
  teacher: z.array(docRefSchema),
})

export type Subject = z.infer<typeof subjectsSchema>
