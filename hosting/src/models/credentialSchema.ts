import { z } from "zod";

export const credentialSchema = z.object({
    password: z.string()
})