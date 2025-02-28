import { DocumentReference, Timestamp } from "firebase-admin/firestore";
import { z } from "zod";
import { isValidCPF } from "./isValidCPF";

export const datePreprocessedSchema = z.preprocess(data => {
  if (!(data instanceof Timestamp)) throw new Error("Invalid date format");

  return data.toDate();
}, z.date())

export const docRefSchema = z.any().refine(
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )

export const cpfSchema = z.string().refine(isValidCPF, "Inválido")