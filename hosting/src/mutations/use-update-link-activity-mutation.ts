import { LINK_ACTIVITY_QUERY } from '@/queries/use-get-link-from-activity-query'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateLinkActivityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateLinkActivity'],
    mutationFn: async ({
      activityId,
      studentId,
      attachment,
    }: {
      activityId: number
      studentId: number
      attachment: string
    }) => {
      const requestBody = {
        attachment,
      }

      await api.patch(`/activities/${activityId}/student/${studentId}`, requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINK_ACTIVITY_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao atualizar link na atividade:', error)
    },
  })
}
