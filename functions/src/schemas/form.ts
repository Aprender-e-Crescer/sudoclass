import { z } from "zod";

export const getTitleDataSchema = z.object({
    url: z.string(),
});

export type GetTitleData = z.infer<typeof getTitleDataSchema>;