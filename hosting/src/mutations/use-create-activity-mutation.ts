import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { LIST_ACTIVITIES_QUERY } from '@/queries/use-list-activities-query'

export function useCreateActivityMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createActivity'],
    mutationFn: async ({
      title,
      instruction,
      deliveryDate,
      postingDate,
      value,
      subjectId,
    }: {
      title: string
      instruction: string
      deliveryDate: string
      postingDate: string
      value: number
      subjectId: number
    }) => {
      const requestBody = {
        title,
        description: instruction,
        value,
        deliveryDate,
        postingDate,
      }

      await api.post(`${subjectId}/activities`, requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_ACTIVITIES_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao criar atividade:', error)
    },
  })
}
