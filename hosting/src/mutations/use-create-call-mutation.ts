import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useCreateSchoolCallMutation() {
  return useMutation({
    mutationKey: ['createSchoolCall'],
    mutationFn: async ({
      id_chamada,
      id_materia,
      data,
      id_aluno,
      status,
    }: {
      id_chamada: number
      id_materia: number
      data: string
      id_aluno: number
      status: boolean
    }) => {
      if (!id_chamada || !id_materia || !data || !id_aluno || status === undefined) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos.')
      }

      const requestBody = {
        id_chamada,
        id_materia,
        data,
        id_aluno,
        status,
      }

      const { data: responseData } = await api.post('/schoolCall', requestBody)
      return responseData
    },

    onError: (error: any) => {
      console.error('Erro ao criar a chamada:', error)
    },
  })
}
