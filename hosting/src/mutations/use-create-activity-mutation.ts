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
      value,
      subjectId,
    }: {
      title: string
      instruction: string
      deliveryDate: string
      value: number
      subjectId: number
    }) => {
      const requestBody = {
        title,
        description: instruction,
        value,
        deliveryDate,
      }

      try {
        await api.post(`/subjects/${subjectId}/activity`, requestBody)

        return 'Atividade criada com sucesso'
      } catch (error) {
        console.error('Erro ao criar atividade:', error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_ACTIVITIES_QUERY })
    },
    onError: (error: any) => {
      console.error('Erro ao criar atividade:', error.message)
    },
  })
}
