import { toast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteCourseMutation } from '@/mutations/use-delete-listing-course-mutation'

export function useCourseController() {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteCourse } = useDeleteCourseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course'] }),
        toast({
          duration: 2000,
          title: 'Sucesso!',
          description: 'O curso foi excluido com sucesso.',
          variant: 'success',
        })
    },
    onError: () =>
      toast({
        duration: 2000,
        title: 'Erro!',
        description: 'Erro ao excluir o curso.',
        variant: 'destructive',
      }),
  })

  return {
    deleteCourse,
  }
}
