import { z } from "zod";
import { isValidCPF } from "../utils/isValidCPF";

export const createAdminDataSchema = z.object({
    fullName: z.string(),
    cpf: z.string().refine(isValidCPF, "Inválido"), password: z.string().min(8)
});

export type CreateAdminData = z.infer<typeof createAdminDataSchema>;

export const updateAdminDataSchema = createAdminDataSchema.extend({
    id: z.string(),
})

export type UpdateAdminData = z.infer<typeof updateAdminDataSchema>;