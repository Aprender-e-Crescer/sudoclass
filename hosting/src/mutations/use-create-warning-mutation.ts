import { WARNING_WALL_QUERY } from '@/queries/use-get-warnings-query'
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateWarningMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createWarning'],
    mutationFn: async ({
      message,
      userId,
      subjectId,
      created_by,
    }: {
      message: string
      userId: number
      subjectId: number
      created_by: string
    }) => {
      const requestBody = {
        mensagem: message,
        id_usuario: userId,
        id_materia: subjectId,
        criado_por: created_by,
      }

      const { data } = await api.post('/warnings', requestBody)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WARNING_WALL_QUERY })
    },
  })
}
