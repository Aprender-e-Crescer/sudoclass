const getFirestoreLib = () => {
  try {
    return typeof process !== undefined ? require("firebase-admin/firestore") : import("firebase/firestore");
  } catch (error) {
    return import("firebase/firestore")
  }
}

const { DocumentReference, Timestamp } = getFirestoreLib();
import { z } from "zod";
import { isValidCPF } from "./isValidCPF";

export const docRefSchema = z.any().refine(
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )

export const datePreprocessedSchema = z.preprocess(data => {
  if (!(data instanceof Timestamp)) throw new Error("Invalid date format");

  return data.toDate();
}, z.date())

export const cpfSchema = z.string().refine(isValidCPF, "Inválido")