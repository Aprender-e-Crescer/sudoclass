import { commentSchema } from '@/models/comment-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useActivityQuery(idActivity: number) {
  return useQuery({
    queryKey: ['getComments', idActivity],
    queryFn: async () => {
      const { data } = await api.get(`/comments/${idActivity}`)
      const comments = z.array(commentSchema).parse(data)

      return comments
    },
  })
}
