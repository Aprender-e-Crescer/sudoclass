import { z } from 'zod'

export const dailyTeachingPlanSchema = z.object({
  teachingMethodology: z.string().min(2, { message: 'O nome não pode ser inferior a 2 caracteres' }),
  teachingResources: z.string().min(2, { message: 'O nome não pode ser inferior a 2 caracteres' }),
  trainingContent: z.string().min(2, { message: 'O nome não pode ser inferior a 2 caracteres' }),
})

export type DailyTeachingPlan = z.infer<typeof dailyTeachingPlanSchema>
