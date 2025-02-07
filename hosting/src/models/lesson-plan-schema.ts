import { datePreprocessedSchema } from '@/utils/schema'
import { z } from 'zod'

export const lessonPlanSchema = z.object({
  id: z.string(),
  startDate: datePreprocessedSchema,
  endDate: datePreprocessedSchema,
  isCallMade: z.boolean(),
  teachingDetails: z.object({
    content: z.string(),
    methodology: z.string(),
    resources: z.string(),
  }),
})

export type LessonPlan = z.infer<typeof lessonPlanSchema>
