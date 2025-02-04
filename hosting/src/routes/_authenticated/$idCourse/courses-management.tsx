import { CardComponent } from '@/components/custom/card-bolletin-board'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueryOptions } from '@/queries/use-get-classes-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/$idCourse/courses-management')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)
    // if (role !== 'admin') throw redirect({ to: '/' })
  },
  component: CoursesManagement,
})

function CoursesManagement() {
  const fullUser = useGetFullUser()
  const { idCourse } = Route.useParams()

  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)

  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const classesQueryOptions = getClassesQueryOptions(idCourse, fullUser.role, student?.classes, teacher?.subjects)
  const courseQueryOptions = getCourseQueryOptions(idCourse)

  const { data: course } = useQuery(courseQueryOptions)
  const { data: classes } = useSuspenseQuery(classesQueryOptions)
  if (!course) return
  return (
    <>
      <When condition={classes?.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Este curso ainda não tem turmas. Que tal criar a primeira?"
          blueButtonText="Criar turma"
          whiteButtonText="Cancelar"
          linkToBlueButton="/"
          linkToWhiteButton="/"
        />
      </When>
      <When condition={classes?.length > 0}>
        <ManagementHeader title={course.name} buttonText="+ Nova turma" />
        <div className="flex flex-col justify-center items-center gap-y-5">
          {classes?.map(({ id, color, name }) => (
            <CardComponent key={id} color={color} name={name} courseName={course?.name} />
          ))}
        </div>
      </When>
    </>
  )
}
