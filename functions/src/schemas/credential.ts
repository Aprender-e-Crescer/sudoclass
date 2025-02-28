import { z } from "zod";
import { cpfSchema } from "../utils/schema";

export const credentialSchema = z.object({
    password: z.string()
})

export type Credential = z.infer<typeof credentialSchema>

export const requestChangePasswordSchema = z.object({
        cpf: cpfSchema,
        password: z.string().min(8),
    })

export type RequestChangePasswordData = z.infer<typeof requestChangePasswordSchema>