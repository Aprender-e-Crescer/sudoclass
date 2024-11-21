import { z } from "zod";

export const chartsSchema = z.object({
    id: z.string(),
    data: z.array(
      z.object({
        browser: z.string(),
        visitors: z.number().min(0).max(100),
        fill: z.string(),
      }),
    ),
    descriptionChart: z.string(),
    endAngle: z.number(),
    innerRadius: z.number(),
    outerRadius: z.number(),
    polarRadius: z.array(z.number()),
    valueSize: z.string(),
  })

export type Charts = z.infer<typeof chartsSchema>
