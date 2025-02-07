import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useCoursesManagementController() {
  const fullUser = useGetFullUser()

  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)

  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const coursesQueryOptions = getCoursesQueryOptions(fullUser.role, student?.classes, teacher?.subjects)
  const { data: courses } = useSuspenseQuery(coursesQueryOptions)

  const { mutate: createCourse } = useCreateCourseMutation()

  return {
    courses,
    createCourse,
  }
}
