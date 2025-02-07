import { z } from "zod";
import { isValidCPF } from "../utils/isValidCPF";

export const loginDataSchema = z.object({ cpf: z.string().refine(isValidCPF, "Inválido"), password: z.string().min(8) })

export type LoginData = z.infer<typeof loginDataSchema>;