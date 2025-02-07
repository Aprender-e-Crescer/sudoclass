import { getAdminsClassesQueryOptions } from '@/queries/use-get-admin-classes-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useCourseManagementController(idCourse: string) {
  const classesQueryOptions = getAdminsClassesQueryOptions(idCourse)
  const courseQueryOptions = getCourseQueryOptions(idCourse)

  const { data: course } = useSuspenseQuery(courseQueryOptions)
  const { data: classes } = useSuspenseQuery(classesQueryOptions)
  return {
    course,
    classes,
  }
}
