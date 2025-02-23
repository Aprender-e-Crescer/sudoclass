import { datePreprocessedSchema } from '@/utils/schema';
import { z } from 'zod';

export const activitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  deliveryDate: datePreprocessedSchema,
  postingDate: datePreprocessedSchema,
  isAcceptingSubmits: z.boolean(),
});

export type Activity = z.infer<typeof activitySchema>;
