import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['subject'],
    mutationFn: async (values: any) => {
      await api.post('subject', values)

      await queryClient.invalidateQueries({ queryKey: ['pedagogues'] })
    },
  })
}
