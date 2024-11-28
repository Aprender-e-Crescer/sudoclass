import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface Results {
  onSuccess: () => void
  onError: () => void
}

export function useDeleteClassMutation({ onSuccess, onError }: Results) {
  return useMutation({
    mutationKey: ['delete-class'],
    mutationFn: (id: number) => api.delete(`/classes/${id}`),
    onSuccess,
    onError,
  })
}
