import { WARNING_WALL_QUERY } from '@/queries/use-warning-wall-query'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteWarningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteWarning'],
    mutationFn: async (warningId: number) => {
      await api.delete(`/warnings/${warningId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNING_WALL_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao deletar aviso:', error)
    },
  })
}
