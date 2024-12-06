import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AddStudentPayload {
  turmaId: number
  idStudent: string  // Alterado para string
}

export function useAddStudentsToClass() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationKey: ['addStudentToClass'],
      mutationFn: async (payload: AddStudentPayload) => {
        const { turmaId, idStudent } = payload

        const response = await api.post(`/turmas/adicionarAlunos`, {
          idStudent,  // Agora passando como string
          id: turmaId, 
        })
  
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: 'students' })
      },
    })
  }
