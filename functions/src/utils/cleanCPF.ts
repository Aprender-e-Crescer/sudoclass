export function cleanCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
}
  