import { cleanCpf } from "./cleanCPF";

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

    const cpfWithOnlyNumbers = cleanCpf(cpf);
    
    if (cpfWithOnlyNumbers.length !== 11) return false;
    
    const cpfDigits = cpfWithOnlyNumbers.split("").map((el) => +el);
    const restWithDigits = rest(cpfDigits);

    return restWithDigits(10) === cpfDigits[9] && restWithDigits(11) === cpfDigits[10];
}