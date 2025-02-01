import { z } from "zod";

export const profileSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    photoURL: z.string(),
})

export type Profile = z.infer<typeof profileSchema>