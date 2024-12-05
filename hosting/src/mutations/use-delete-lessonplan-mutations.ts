import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

interface Results {
  onSuccess: () => void
  onError: () => void
}

export function useDeleteLessonPlanMutation({ onSuccess, onError }: Results) {
  return useMutation<void, Error, number>({
    mutationKey: ['delete-lesson-plan'],
    mutationFn: (id: number) => api.delete(`/lessonPlan/${id}`),
    onSuccess,
    onError,
  })
}
