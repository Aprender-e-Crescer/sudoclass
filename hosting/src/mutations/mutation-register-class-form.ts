import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface CreationClass {
  nome_turma: string,
  turno: string,
  cargahoraria: number,
  datainicio: Date,
  datafim: Date,
  ementa: string,
  dataFinalIncricao: Date,
  vagasincricoes: number,
}

export function useRegisterClassMutation() {
  return useMutation({
    mutationKey: ['register-class'],
    mutationFn: (values: CreationClass) => api.post('/turmas', values)
  })
}
