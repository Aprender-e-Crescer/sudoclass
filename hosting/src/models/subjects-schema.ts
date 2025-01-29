import { z } from 'zod'

export const subjectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  endDate: z.string(),
  startDate: z.string(),
  workload: z.string(),
  teacher: z.number(),
  menu: z.string(),
  course: z.number(),
  color: z.string(),
})

export type Subject = z.infer<typeof subjectsSchema>
