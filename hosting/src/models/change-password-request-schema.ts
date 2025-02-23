import { docRefSchema } from '@/utils/schema'
import { z } from 'zod'

export const changePasswordRequestSchema = z.object({
  profileRef: docRefSchema,
  requestStatus: z.enum(['pending', 'accepted', 'recused']).optional(),
})

export type ChangeRequests = z.infer<typeof changePasswordRequestSchema>
