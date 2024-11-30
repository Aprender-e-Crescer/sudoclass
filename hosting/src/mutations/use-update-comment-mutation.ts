import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { COMMENT_QUERY } from '@/queries/use-comment-query'

export function useUpdateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateComment'],
    mutationFn: async ({ commentId, message }: { commentId: number; message: string }) => {
      await api.patch(`/comments/${commentId}`, { message })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao atualizar comentário:', error)
    },
  })
}
