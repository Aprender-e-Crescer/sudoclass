import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useDeleteSchoolCallMutation() {
  return useMutation({
    mutationKey: ['deleteSchoolCall'],
    mutationFn: async (id_chamada: number) => {
      if (!id_chamada) {
        throw new Error('ID da chamada é obrigatório.')
      }

      const { data: responseData } = await api.delete(`/schoolCall/delete/${id_chamada}`)
      return responseData
    },

    onError: (error: any) => {
      console.error('Erro ao excluir a chamada:', error)
    },

    onSuccess: () => {
      console.log('Chamada excluída com sucesso')
    },
  })
}
