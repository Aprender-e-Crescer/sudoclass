import { z } from "zod";

const rest = (cpfDigits: number[]) => (count: number) => {
    const sliceEnd = count - 12;
    const factor = count;
    
    const sum = cpfDigits.slice(0, sliceEnd).reduce((soma, el, index) => {
        return soma + el * (factor - index);
    }, 0);
    
    const result = (sum * 10) % 11;
    
    return result % 10;
};

export function isValidCPF(cpf: string) {
    if (typeof cpf !== "string") return false;

    const nonDigitRegex = /[^\d]+/g;
    const repeatedDigitsRegex = /(\d)\1{10}/;
    const cpfWithOnlyNumbers = cpf.replace(nonDigitRegex, "");
    
    if (cpfWithOnlyNumbers.length !== 11 || !!cpfWithOnlyNumbers.match(repeatedDigitsRegex)) return false;
    
    const cpfDigits = cpfWithOnlyNumbers.split("").map((el) => +el);
    const restWithDigits = rest(cpfDigits);

    return restWithDigits(10) === cpfDigits[9] && restWithDigits(11) === cpfDigits[10];
}

export const loginDataSchema = z.object({ cpf: z.string().refine(isValidCPF, "Inválido"), password: z.string().min(8) })

export type LoginData = z.infer<typeof loginDataSchema>;