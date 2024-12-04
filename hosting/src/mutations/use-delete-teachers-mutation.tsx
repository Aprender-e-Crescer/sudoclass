import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface Results {
  onSuccess: () => void
  onError: () => void
}

export function useDeleteTeachersMutation({ onSuccess, onError }: Results) {
  return useMutation({
    mutationKey: ['delete-teachers'],
    mutationFn: (id: number) => api.delete(`/teacher/${id}`),
    onSuccess,
    onError,
  })
}
