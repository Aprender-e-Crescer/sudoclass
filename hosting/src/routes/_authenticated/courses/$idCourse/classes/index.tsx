import { useGetFullUser } from '@/hooks/use-get-full-user'
import { authStateReadyQueryOptions } from '@/queries/use-auth-state-ready-query'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueryOptions, useGetClassesQuery } from '@/queries/use-get-classes-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { studentPersonalClassesQueryOptions, useStudentPersonalClasses } from '@/queries/use-student-personal-classes-query'
import { teacherPersonalSubjectsQueryOptions, useTeacherPersonalSubjects } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/')({
  loader: async ({ params: { idCourse }, context: { queryClient } }) => {
    const isAuthStateReady = await queryClient.ensureQueryData(authStateReadyQueryOptions)
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions(isAuthStateReady))
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))

    const role = getRoleFromRef(user?.roleRef)

    const student = studentPersonalClassesQueryOptions(role, user?.roleRef).enabled ? 
      await queryClient.ensureQueryData(studentPersonalClassesQueryOptions(role, user?.roleRef)) : 
      undefined

    const teacher = teacherPersonalSubjectsQueryOptions(role, user?.roleRef).enabled ?
      await queryClient.ensureQueryData(teacherPersonalSubjectsQueryOptions(role, user?.roleRef)) :
      undefined
      
    return queryClient.ensureQueryData(getClassesQueryOptions(idCourse, role, student?.classes, teacher?.subjects))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const fullUser = useGetFullUser()
  const { idCourse } = Route.useParams()
  const { data: student } = useStudentPersonalClasses(fullUser?.role, fullUser?.roleRef)
  const { data: teacher } = useTeacherPersonalSubjects(fullUser?.role, fullUser?.roleRef)
  const { data: classes } = useGetClassesQuery(idCourse, fullUser?.role, student?.classes, teacher?.subjects)

  return (
    <>
      {classes?.map(({ id, name }) => (
        <Link to="/courses/$idCourse/classes/$idClass/subjects" params={{ idCourse, idClass: id }}>{name}</Link>
      ))}
    </>
  )
}
