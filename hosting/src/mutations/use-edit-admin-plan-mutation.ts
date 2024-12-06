import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useEditPedagogue(pedagogueId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editPedagogues', pedagogueId],
    mutationFn: async (values: any) => {
      await api.put(`pedagogos/${pedagogueId}`, values) 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedagogos'] }) 
    },
  })
}
