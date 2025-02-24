import { getUserQueryOptions } from '@/queries/use-get-user-query';
import { formatWithMask } from '@/utils/formatWithMask';
import { masks } from '@/utils/masks';
import { DocumentReference, Timestamp } from "firebase/firestore";
import { z } from "zod";
import { isValidCPF } from '../../../functions/src/utils/isValidCPF';
import { QueryClient } from '@tanstack/react-query';
import { parse } from "date-fns";

export const stringToNumberPreprocessedSchema = z.preprocess((value) => {
    if (typeof value === 'number') return value
    
    if (typeof value !== 'string') return undefined

    return Number(value)
}, z.number())

export const stringToDatePreprocessedSchema = z.preprocess((value) => {
    if (typeof value !== 'string') return undefined

    return parse(value, 'yyyy-MM-dd', new Date())
}, z.date())

export const datePreprocessedSchema = z.preprocess(data => {
    if (!(data instanceof Timestamp)) throw new Error("Invalid date format");

    return data.toDate();
}, z.date())

export const docRefSchema = z.any().refine(
    (documentReference: object): documentReference is DocumentReference => documentReference instanceof DocumentReference,
  )

export const telephoneSchema = z.preprocess((value) => {
    if (typeof value !== 'string') return undefined

    return formatWithMask({
      text: value,
      mask: masks.BRL_PHONE,
    }).unmasked
  }, z.string().refine((value) => value.length === 11, "Inválido"))

export const ensureCPFUniqueSchema = (action: 'create' | 'edit', queryClient: QueryClient) => z.string().superRefine(async (cpf, ctx) => {
    if (!isValidCPF(cpf)) return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CPF inválido",
    });

    try {
      const unmaskedCPF = formatWithMask({
        text: cpf,
        mask: masks.BRL_CPF,
      }).unmasked

      const user = await queryClient.ensureQueryData(getUserQueryOptions(unmaskedCPF))

      if (user.exists() && action === 'create') return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF indisponível",
      });

      return true
    } catch (error) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Erro ao buscar CPF",
      });
    }
  })