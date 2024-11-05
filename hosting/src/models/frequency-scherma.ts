import { z } from "zod";
import { Timestamp } from "firebase/firestore"; 

export const frequencySchema = z.object({
  IDclass: z.string().min(2, { message: 'O nome da classe deve ter pelo menos 2 caracteres' }),
  data: z.instanceof(Timestamp).refine((data) => {
    return data instanceof Timestamp; 
  }, {
    message: 'A data deve ser um Timestamp válido do Firestore',
  }),
  status: z.enum(["present", "absent", "late"], { required_error: 'O campo deve ser um status válido' }),
});

export type Frequency = z.infer<typeof frequencySchema>;
