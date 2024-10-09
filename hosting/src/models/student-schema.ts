import { z } from 'zod'

export const studentSchema = z.object({
    id: z.string(),
    address: z.object({
      city: z.string(),
      neighborhood: z.string(),
      state: z.string(),
      street: z.string(),
      streetNumber: z.number()
    }),
    cityOfBirth: z.string(),
    cpf: z.string(),
    dateOfBirth: z.string(),
    email: z.string().email(),
    name: z.string(),
    rg: z.string(),
    shippingDate: z.string(),
    shippingStatus: z.string(),
    stateOfBirth: z.string(),
    telephone: z.string()
  })

export type Student = z.infer<typeof studentSchema>
