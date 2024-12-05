import { toast } from '@/hooks/use-toast'
import { useDeleteLessonPlanMutation } from '@/mutations/use-delete-lessonplan-mutations'
import { LESSON_PLAN_QUERY_KEY } from '@/queries/use-list-lesson-plan'

import { useQueryClient } from '@tanstack/react-query'

export function useLessonPlanController() {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteClass } = useDeleteLessonPlanMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LESSON_PLAN_QUERY_KEY
      })
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast({
        title: 'Sucesso!',
        description: 'O Plano de aula foi excluída com sucesso.',
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



