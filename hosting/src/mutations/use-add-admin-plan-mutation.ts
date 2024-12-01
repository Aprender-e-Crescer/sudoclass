import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreatePedagogues() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['pedagogues'],
    mutationFn: async (values: any) => {
      await api.post('pedagogos', values)

      await queryClient.invalidateQueries({ queryKey: ['pedagogues'] })
    },
  })
}