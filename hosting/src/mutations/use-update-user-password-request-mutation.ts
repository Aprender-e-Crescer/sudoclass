import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

export function useUpdatePasswordChangeMutation({ onSuccess, onError }: MutationResults) {
  return useMutation({
    mutationKey: ['update-user-password-change'],
    mutationFn: (id: number) => api.put(`/trocar-senha/usuario/${id}`),
    onSuccess,
    onError,
  })
}
