import { DocumentReference } from "firebase/firestore";
import { z } from "zod";

export const datePreprocessedSchema = z.preprocess(data => {
    if (data instanceof Date) return data;
    
    if (typeof data !== "string" && typeof data !== "number") throw new Error("Invalid date format");

    return new Date(data);
}, z.date())

export const docRefSchema = z.any().refine(
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )