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
  estadonascimento: string,
  cidadedenascimento: string
}

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

export function useUpdateTeacherMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['register-teacher'],
    mutationFn: (values: UpdateTeacherPayload) => api.put(`/teacher/${values.idTeacher}`, values),
    onSuccess,
    onError,
  })
}
