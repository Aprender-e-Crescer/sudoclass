import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { LIST_ACTIVITIES_QUERY } from '@/queries/use-list-activities-query'

export function useDeleteActivityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteActivity'],
    mutationFn: async (activityId: number) => {
      await api.delete(`/activities/${activityId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_ACTIVITIES_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao excluir a atividade:', error)
    },
  })
}
