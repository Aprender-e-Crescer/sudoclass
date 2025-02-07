import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { useDeleteCourseMutation } from '@/mutations/use-delete-course-mutation'
import { useUpdateCourseMutation } from '@/mutations/use-update-course-mutation'
import { getAdminCoursesFirestoreQuery, getAdminCoursesQueryOptions } from '@/queries/use-get-admin-courses-query'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useCoursesManagementController() {
  const coursesQueryOptions = getAdminCoursesQueryOptions()

  const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  useFirestoreRealtimeQuery(coursesQueryOptions.queryKey, getAdminCoursesFirestoreQuery())

  const { mutate: createCourse } = useCreateCourseMutation()
  const { mutate: editCourse } = useUpdateCourseMutation()
  const { mutate: deleteCourse } = useDeleteCourseMutation()

  return {
    courses,
    createCourse,
    editCourse: (data: { id: string; name: string; color: string }) => editCourse(data),
    deleteCourse,
  }
}
