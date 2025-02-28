const getFirestoreLib = () => {
  try {
    // @ts-expect-error
    return typeof process !== undefined ? require("firebase-admin/firestore") : import("firebase/firestore");
  } catch (error) {
    // @ts-expect-error
    return import("firebase/firestore")
  }
}

const { DocumentReference, Timestamp } = getFirestoreLib();
import { z } from "zod";
import { isValidCPF } from "./isValidCPF";

export const docRefSchema = z.any().refine(
    // @ts-expect-error
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )

export const datePreprocessedSchema = z.preprocess(data => {
  if (!(data instanceof Timestamp)) throw new Error("Invalid date format");

  // @ts-expect-error
  return data.toDate();
}, z.date())

export const cpfSchema = z.string().refine(isValidCPF, "Inválido")