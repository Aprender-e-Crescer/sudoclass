import { docRefSchema } from "@/utils/schema";
import { z } from "zod";

export const profileSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    photoURL: z.string().optional().nullable(),
    profileRef: docRefSchema.optional().nullable(),
})

export type Profile = z.infer<typeof profileSchema>