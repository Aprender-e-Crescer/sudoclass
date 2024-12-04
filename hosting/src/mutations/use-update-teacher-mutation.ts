import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateTeacherPayload {
  nome: string,
  datanasc: string,
  email: string,
  estado: string,
  municipio: string,
  rua: string,
  bairro: string,
  numero: string,
  cpf: string,
  rg: string,
  datadeexpedicaorg: Date,
  estadodeexpedicaorg: string,
  estadonascimento: Date,
  cidadedenascimento: string
}

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

interface MutationParams {
  id: number
  values: UpdateTeacherPayload
}

export function useUpdateTeacherMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['register-teacher'],
    mutationFn: ({id, values}: MutationParams) => api.put(`/teacher/${id}`, values),
    onSuccess,
    onError,
  })
}
