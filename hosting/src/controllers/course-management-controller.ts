import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { toast } from '@/hooks/use-toast'
import { useDeleteClassMutation } from '@/mutations/use-delete-class-mutations'
import { getAdminsClassesFirestoreQuery, getAdminsClassesQueryOptions } from '@/queries/use-get-admin-classes-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useCourseManagementController(idCourse: string) {
  const classesQueryOptions = getAdminsClassesQueryOptions(idCourse)
  const courseQueryOptions = getCourseQueryOptions(idCourse)

  const { data: course } = useSuspenseQuery(courseQueryOptions)
  const { data: classes } = useSuspenseQuery(classesQueryOptions)
  useFirestoreRealtimeQuery(classesQueryOptions.queryKey, getAdminsClassesFirestoreQuery(idCourse))

  const { mutate: deleteClass } = useDeleteClassMutation({
    onError(error) {
      toast({
        title: 'Erro ao excluir uma turma',
        variant: 'destructive',
        description: error.message,
      })
    },
    onSuccess() {
      toast({
        title: 'Sucesso!',
        description: 'A turma foi excluida.',
        variant: 'sucesss',
      })
    },
  })
  return {
    course,
    classes,
    deleteClass,
  }
}
