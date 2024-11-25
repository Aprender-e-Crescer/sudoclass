import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { COMMENT_QUERY } from '@/queries/use-comment-query'

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: async ({ message, userId, activityId }: { message: string; userId: number; activityId: number }) => {
      const { data } = await api.post('/comments', { message, userId, activityId })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao criar comentário:', error)
    },
  })
}
