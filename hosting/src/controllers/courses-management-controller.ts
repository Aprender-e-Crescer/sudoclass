import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { toast } from '@/hooks/use-toast'
import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { useDeleteCourseMutation } from '@/mutations/use-delete-course-mutation'
import { useUpdateCourseMutation } from '@/mutations/use-update-course-mutation'
import { getAdminCoursesFirestoreQuery, getAdminCoursesQueryOptions } from '@/queries/use-get-admin-courses-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function useCoursesManagementController() {
  const coursesQueryOptions = getAdminCoursesQueryOptions()
  const navigate = useNavigate({ from: '/' })

  const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  useFirestoreRealtimeQuery(coursesQueryOptions.queryKey, getAdminCoursesFirestoreQuery())

  const { mutate: createCourse } = useCreateCourseMutation({
    onError: (error) => {
      toast({
        title: 'Erro ao criar curso',
        variant: 'destructive',
        description: error.message,
      })
    },
    onSuccess: ({ id }) => {
      toast({
        title: 'Sucesso!',
        variant: 'sucesss',
        description: 'Curso criado',
      })
      navigate({ to: `course/${id}/classes/management` })
    },
  })
  const { mutate: editCourse } = useUpdateCourseMutation()
  const { mutate: deleteCourse } = useDeleteCourseMutation()

  return {
    courses,
    createCourse,
    editCourse: (data: { id: string; name: string; color: string }) => editCourse(data),
    deleteCourse,
  }
}
