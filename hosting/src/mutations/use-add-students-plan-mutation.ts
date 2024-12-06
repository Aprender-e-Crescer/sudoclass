import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['useCreateStudent'],
    mutationFn: async (values: any) => {
      await api.post('/alunos', values)

      await queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
} 