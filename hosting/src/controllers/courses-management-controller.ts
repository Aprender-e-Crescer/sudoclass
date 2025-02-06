import { useGetFullUser } from '@/hooks/use-get-full-user'
import { getClassesQueryOptions } from '@/queries/use-get-classes-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useCoursesManagementController(idCourse: string) {
  const fullUser = useGetFullUser()
  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)

  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const classesQueryOptions = getClassesQueryOptions(idCourse, fullUser.role, student?.classes, teacher?.subjects)
  const courseQueryOptions = getCourseQueryOptions(idCourse)

  const { data: course } = useSuspenseQuery(courseQueryOptions)
  const { data: classes } = useSuspenseQuery(classesQueryOptions)
  return {
    course,
    classes,
  }
}
