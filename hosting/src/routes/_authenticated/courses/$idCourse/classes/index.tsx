import NotFound from '@/components/custom/not-found'
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesFirestoreQuery, getClassesQueryOptions } from '@/queries/use-get-classes-query'
import { getCourseFirestoreQuery, getCourseQueryOptions } from '@/queries/use-get-course-by-id'
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
    const userData = user?.data()

    if (!userData) throw new Error('User not found')

    const role = getRoleFromRef(userData?.roleRef)

    const student = getStudentPersonalClassesQueryOptions(role, userData?.roleRef).enabled ? 
      await queryClient.ensureQueryData(getStudentPersonalClassesQueryOptions(role, userData?.roleRef)) : 
      undefined

    const teacher = getTeacherPersonalSubjectsQueryOptions(role, userData?.roleRef).enabled ?
      await queryClient.ensureQueryData(getTeacherPersonalSubjectsQueryOptions(role, userData?.roleRef)) :
      undefined
      
    return queryClient.ensureQueryData(getClassesQueryOptions(idCourse, role, student?.data()?.classes, teacher?.data()?.subjects))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const fullUser = useGetFullUser()
  
  const { idCourse } = Route.useParams()

  const courseQueryOptions = getCourseQueryOptions(idCourse)
  const { data: course } = useQuery(courseQueryOptions)

  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)
  
  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const classesQueryOptions = getClassesQueryOptions(idCourse, fullUser?.role, student?.classes, teacher?.subjects)

  const { data: classes } = useSuspenseQuery(classesQueryOptions)

  useFirestoreRealtimeQuery(courseQueryOptions.queryKey, getCourseFirestoreQuery(idCourse))
  useFirestoreRealtimeQuery(studentPersonalClassesQueryOptions.queryKey, getStudentPersonalClassesFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(teacherPersonalSubjectsQueryOptions.queryKey, getTeacherPersonalSubjectsFirestoreQuery(fullUser.roleRef))
  useFirestoreRealtimeQuery(classesQueryOptions.queryKey, getClassesFirestoreQuery(idCourse, fullUser.role, student?.classes, teacher?.subjects))

  return (
    <>
      {classes?.length === 0 ? (
        <NotFound
          title="Ops! Nada por aqui..."
          description="Este curso ainda não tem turmas."
          whiteButtonText="Voltar a página inicial"
          linkToWhiteButton="/"
        />
      ) : (
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Turmas - {course?.name}</h1>
          </div>
          <hr />
          {classes?.map(({ id, name, color }) => (
            <Link key={id} to="/courses/$idCourse/classes/$idClass/subjects" params={{ idCourse, idClass: id }}>
              <div className="flex items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="w-1.5 h-16 rounded-full mr-4" style={{ backgroundColor: color }} />
                <span className="flex-grow font-medium">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
