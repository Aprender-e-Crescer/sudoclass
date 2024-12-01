import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: async (values: any) => {
      await api.post('course', values)

      await queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })}