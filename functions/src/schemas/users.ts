import { z } from "zod";
import { cpfSchema, datePreprocessedSchema, docRefSchema } from "../utils/schema";

export const adminUserSchema = z.object({
    id: z.string(),
    profileRef: docRefSchema,
    roleRef: docRefSchema,
    requireNewPassword: z.boolean(),
    fullName: z.string(),
  })

export const userSchema = adminUserSchema.extend({
    contact: z.object({
      email: z.string().email().nullable(),
      telephone: z.string().nullable(),
    }),
    address: z.object({
      state: z.string().nullable(),
      city: z.string().nullable(),
      street: z.string().nullable(),
      neighborhood: z.string().nullable(),
      number: z.string().nullable(),
    }),
    birth: z.object({
      date: datePreprocessedSchema.nullable(),
      state: z.string().nullable(),
      city: z.string().nullable(),
    }),
    generalRegistration: z.object({
      number: z.string().nullable(),
      dispatch: z.object({
        date: datePreprocessedSchema.nullable(),
        state: z.string().nullable(),
      }),
    }),
  })

export const createResponsibleSchema = userSchema
  .omit({
    profileRef: true,
    roleRef: true,
    requireNewPassword: true,
    id: true,
  })
  .extend({
    cpf: cpfSchema,
    responsibleFor: z.array(z.string()),
  })

export type CreateResponsibleData = z.infer<typeof createResponsibleSchema>;

export const updateResponsibleSchema = userSchema
  .omit({
    profileRef: true,
    requireNewPassword: true,
    roleRef: true,
  })
  .extend({
    roleRefPath: z.string(),
    responsibleFor: z.array(z.string()),
  })

export type UpdateResponsibleData = z.infer<typeof updateResponsibleSchema>;

export const createTeacherSchema = userSchema
  .omit({
    profileRef: true,
    roleRef: true,
    requireNewPassword: true,
    id: true,
  })
  .extend({
    cpf: cpfSchema,
    subjects: z.array(z.string()),
  })

export type CreateTeacherData = z.infer<typeof createTeacherSchema>;

export const updateTeacherSchema = userSchema
  .omit({
    profileRef: true,
    roleRef: true,
    requireNewPassword: true,
  })
  .extend({
    roleRefPath: z.string(),
    subjects: z.array(z.string()),
  })

export type UpdateTeacherData = z.infer<typeof updateTeacherSchema>;

export const createStudentSchema = userSchema
  .omit({
    profileRef: true,
    roleRef: true,
    requireNewPassword: true,
    id: true,
  })
  .extend({
    cpf: cpfSchema,
    classes: z.array(z.string()),
  })

export type CreateStudentData = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = userSchema
  .omit({
    profileRef: true,
    roleRef: true,
    requireNewPassword: true,
  })
  .extend({
    roleRefPath: z.string(),
    classes: z.array(z.string()),
  })

export type UpdateStudentData = z.infer<typeof updateStudentSchema>;

export const createAdminSchema = adminUserSchema
  .pick({
    fullName: true,
  })
  .extend({
    cpf: cpfSchema,
  })

export type CreateAdminData = z.infer<typeof createAdminSchema>;

export const updateAdminSchema = adminUserSchema
  .pick({
    id: true,
    fullName: true,
  })

export type UpdateAdminData = z.infer<typeof updateAdminSchema>;