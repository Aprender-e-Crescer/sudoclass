import { z } from "zod";

export const datePreprocessedSchema = z.preprocess(data => new Date(data), z.date())