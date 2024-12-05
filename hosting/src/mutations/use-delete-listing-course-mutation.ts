import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface Results {
  onSuccess: () => void
  onError: () => void
}

export function useDeleteCourseMutation({ onSuccess, onError }: Results) {
  return useMutation({
    mutationKey: ['delete-course'],
    mutationFn: (id: number) => api.delete(`/course/${id}`),
    onSuccess,
    onError,
  })
}
