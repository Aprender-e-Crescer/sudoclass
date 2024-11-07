import { z } from "zod";

export const listTeacherSchema = z.object({
    birthCity: z.string(),
    birthStatus: z.string(),
    cpf: z.string(),
    email: z.string(),
    fullName: z.string(),
    municipality: z.string(),
    neighborhood: z.string(),
    number: z.number().or(z.string()),
    password: z.string(),
    profilePhoto: z.string(),
    rgDispatchDate: z.string(),
    rgDispatchStatus: z.string(),
    rgNumber: z.number(),
    state: z.string(),
    street: z.string(),
    telephone: z.number(),
  })