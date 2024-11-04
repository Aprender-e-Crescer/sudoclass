import { z } from 'zod'

export const syllabusSchema = z.object({
  name: z.string().min(1, 'campo obrigatorio'),
})

export type Syllabus = z.infer<typeof syllabusSchema>
