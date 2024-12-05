import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useEditStudent(studentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['useEditStudent', studentId],
    mutationFn: async (values: any) => {
      await api.put(`/alunos/${studentId}`, values)

      await queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
} 
