import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { LIST_ACTIVITIES_QUERY } from '@/queries/use-list-activities-query'

export function useUpdateActivityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateActivity'],
    mutationFn: async ({
      activityId,
      title,
      instruction,
      deliveryDate,
      value,
      attachment,
    }: {
      activityId: number
      title: string
      instruction: string
      deliveryDate: string
      value: number
      attachment: string | null
    }) => {
      const requestBody = {
        title,
        description: instruction,
        deliveryDate,
        value,
        attachment,
      }

      const response = await api.put(`/activity/${activityId}`, requestBody)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_ACTIVITIES_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao atualizar a atividade:', error)
    },
  })
}
