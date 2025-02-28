import { z } from "zod";
import { isValidCPF } from "../utils/isValidCPF";
import { cpfSchema } from "../utils/schema";

export const loginDataSchema = z.object({ cpf: cpfSchema, password: z.string().min(8) })

export type LoginData = z.infer<typeof loginDataSchema>;