import { z } from "zod";

export const getClassPresenceByClassAndSubjectIdSchema = z.object({ idClass: z.number(), idSubject: z.number() });

export type GetClassPresenceByClassAndSubjectIdData = z.infer<typeof getClassPresenceByClassAndSubjectIdSchema>;