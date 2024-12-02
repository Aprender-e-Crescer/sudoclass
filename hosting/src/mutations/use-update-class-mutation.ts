import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateClassPayload {
  nome_turma: string,
  turno: string,
  cargahoraria: number,
  datainicio: Date,
  datafim: Date,
  ementa: string,
  dataFinalIncricao: Date,
  vagasincricoes: number,
}

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

interface MutationParams {
  id: number
  values: UpdateClassPayload
}

export function useUpdateClassMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['update-class'],
    mutationFn: ({id, values}: MutationParams) => api.put(`/turmas/${id}`, values),
    onSuccess,
    onError,
  })
}
