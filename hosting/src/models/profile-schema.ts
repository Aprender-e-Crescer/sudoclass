import { z } from "zod";

export const profileSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    photoUrl: z.string(),
})

export type Profile = z.infer<typeof profileSchema>