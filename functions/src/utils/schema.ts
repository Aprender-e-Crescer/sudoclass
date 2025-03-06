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
import { isDate } from 'date-fns'

export const docRefSchema = z.any().refine(
    // @ts-expect-error
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )

export const datePreprocessedSchema = z.preprocess(data => {
  if (data instanceof Date) return data;

  if (typeof data === 'string' && isDate(new Date(data))) {
    const parsedDate = new Date(data);
    return parsedDate;
  }

  // @ts-expect-error
  if (typeof data?.toDate === 'function') return data.toDate();
    
  throw new Error("Invalid date format");  
}, z.date())

export const cpfSchema = z.string().refine(isValidCPF, "Inválido")