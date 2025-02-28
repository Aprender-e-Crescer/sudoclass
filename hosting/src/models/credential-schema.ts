import { z } from 'zod'

export type { RequestChangePasswordData } from '../../../functions/src/schemas/credential'

export const credentialSchema = z.object({
  password: z.string(),
})

export type Credential = z.infer<typeof credentialSchema>
