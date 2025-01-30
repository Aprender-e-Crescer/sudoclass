import { WARNING_WALL_QUERY } from '@/queries/use-get-warnings-query'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateWarningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateWarning'],
    mutationFn: async ({ warningId, message }: { warningId: number; message: string }) => {
      const requestBody = {
        mensagem: message,
      }

      await api.put(`/warnings/${warningId}`, requestBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNING_WALL_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao atualizar aviso:', error)
    },
  })
}
