import { z } from 'zod'
import { Timestamp } from "firebase/firestore";

export const classListSchema = z.object({
    name: z.string().min(3, "O campo 'Nome' é obrigatório"),
    shift: z.string().min(1, "O campo 'Turno' é obrigatório"),
    numberOfHours: z.number().positive( "O campo 'Número de horas' é obrigatório").int("o numero deve ser inteiro"),
    totalVacancies: z.number().positive( "O campo 'Total de vagas' é obrigatório").int("o numero deve ser inteiro"),
    released: z.boolean({message: "Este campo é obrigatório"}),
    completed: z.boolean({message: "Este campo é obrigatório"}),

    endPrediction: z.instanceof(Timestamp).refine((data) => {
        return data instanceof Timestamp;
      }, {
        message: 'A data deve ser um válido',
      }),

    registrationEndDate: z.instanceof(Timestamp).refine((data) => {
        return data instanceof Timestamp;
      }, {
        message: 'A data deve ser um válido',
      }),
    startForecast: z.instanceof(Timestamp).refine((data) => {
        return data instanceof Timestamp;
      }, {
        message: 'A data deve ser um válido',
      }),
}) 

export type classes = z.infer<typeof classListSchema>

