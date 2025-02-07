import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { getAdminCoursesQueryOptions } from '@/queries/use-get-admin-courses-query'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useCoursesManagementController() {
  const coursesQueryOptions = getAdminCoursesQueryOptions()

  const { data: courses } = useSuspenseQuery(coursesQueryOptions)
  const { mutate: createCourse } = useCreateCourseMutation()

  return {
    courses,
    createCourse,
  }
}
