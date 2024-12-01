
import { api } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useEditCourse(courseId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['editCourse', courseId],
    mutationFn: async (values: any) => {
      await api.put(`course/${courseId}`, values)

      await queryClient.invalidateQueries({ queryKey: ['cursos'] })
    },
  })
}