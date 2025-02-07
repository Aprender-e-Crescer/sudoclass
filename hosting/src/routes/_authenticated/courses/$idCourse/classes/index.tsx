import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueryOptions, getClassesFirestoreQuery } from '@/queries/use-get-classes-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStudentPersonalClassesFirestoreQuery, getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsFirestoreQuery, getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/')({
  loader: async ({ params: { idCourse }, context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))

    const role = getRoleFromRef(user?.roleRef)

    const student = getStudentPersonalClassesQueryOptions(role, user?.roleRef).enabled ? 
      await queryClient.ensureQueryData(getStudentPersonalClassesQueryOptions(role, user?.roleRef)) : 
      undefined

    const teacher = getTeacherPersonalSubjectsQueryOptions(role, user?.roleRef).enabled ?
      await queryClient.ensureQueryData(getTeacherPersonalSubjectsQueryOptions(role, user?.roleRef)) :
      undefined
      
    return queryClient.ensureQueryData(getClassesQueryOptions(idCourse, role, student?.data()?.classes, teacher?.data()?.subjects))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const fullUser = useGetFullUser()
  
  const { idCourse } = Route.useParams()

  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)
  
  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const classesQueryOptions = getClassesQueryOptions(idCourse, fullUser?.role, student?.classes, teacher?.subjects)

  const { data: classes } = useSuspenseQuery(classesQueryOptions)

  useFirestoreRealtimeQuery(studentPersonalClassesQueryOptions.queryKey, getStudentPersonalClassesFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(teacherPersonalSubjectsQueryOptions.queryKey, getTeacherPersonalSubjectsFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(classesQueryOptions.queryKey, getClassesFirestoreQuery(idCourse, fullUser.role, student?.classes, teacher?.subjects))

  return (
    <>
      {classes?.map(({ id, name }) => (
        <Link key={id} to="/courses/$idCourse/classes/$idClass/subjects" params={{ idCourse, idClass: id }}>{name}</Link>
      ))}
    </>
  )
}
