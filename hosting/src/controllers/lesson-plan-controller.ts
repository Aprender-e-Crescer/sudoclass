import { toast } from '@/hooks/use-toast'
import { useDeleteLessonPlanMutation } from '@/mutations/use-delete-lessonplan-mutations'

import { useQueryClient } from '@tanstack/react-query'

export function useLessonPlanController() {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteClass } = useDeleteLessonPlanMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast({
        title: 'Sucesso!',
        description: 'A turma foi excluída.',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Erro!',
        description: 'Erro ao excluir a turma.',
        variant: 'destructive',
      })
    },
  })

  return { deleteClass }
}
