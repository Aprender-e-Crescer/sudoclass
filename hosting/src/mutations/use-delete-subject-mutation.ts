import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface Results {
  onSuccess: () => void
  onError: () => void
}

export function useDeleteSubjectMutation({ onSuccess, onError }: Results) {
  return useMutation({
    mutationKey: ['delete-subject'],
    mutationFn: (id: number) => api.delete(`/subject/${id}`),
    onSuccess,
    onError,
  })
}
