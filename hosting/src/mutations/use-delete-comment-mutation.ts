import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { COMMENT_QUERY } from '@/queries/use-comment-query'

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: async (commentId: number) => {
      await api.delete(`/comment/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY })
    },
    onError: (error) => {
      console.error('Erro ao excluir comentário:', error)
    },
  })
}
