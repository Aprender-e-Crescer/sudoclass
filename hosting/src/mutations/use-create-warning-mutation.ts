import { WARNING_WALL_QUERY } from '@/queries/use-warning-wall-query'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateWarningMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createWarning'],
    mutationFn: async ({ message, userId, subjectId }: { message: string; userId: number; subjectId: number }) => {
      const { data } = await api.post('/warnings', { message, userId, subjectId })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNING_WALL_QUERY })
    },
  })
}
