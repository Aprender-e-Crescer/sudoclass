import { z } from "zod";

export const credentialSchema = z.object({
    password: z.string()
})

export type Credential = z.infer<typeof credentialSchema>
