import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { LIST_ACTIVITIES_QUERY } from '@/queries/use-list-activities-query'

export function useAddGradeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addGradeToActivity'],
    mutationFn: async ({ activityId, studentId, grade }: { activityId: number; studentId: number; grade: number }) => {
      await api.patch(`/activity/${activityId}`, { studentId, grade })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_ACTIVITIES_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao adicionar a nota:', error)
    },
  })
}
