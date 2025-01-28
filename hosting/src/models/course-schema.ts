import { z } from "zod";

export const courseSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
})

export type Course = z.infer<typeof courseSchema>