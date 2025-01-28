import { CardComponent } from '@/components/custom/card-bolletin-board'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useGetClassesQuery } from '@/queries/use-get-classes-query'
import { useStudentPersonalClasses } from '@/queries/use-student-personal-classes-query'
import { useTeacherPersonalSubjects } from '@/queries/use-teacher-personal-subjects-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  const fullUser = useGetFullUser()
  const idCourse = Route.useParams()
  const { data: student } = useStudentPersonalClasses(fullUser?.role, fullUser?.roleRef)
  const { data: teacher } = useTeacherPersonalSubjects(fullUser?.role, fullUser?.roleRef)
  const { data: classes } = useGetClassesQuery(String(idCourse), fullUser?.role, student?.classes, teacher?.subjects)
  console.log('a', classes)
  console.log('estudantes:', student)

  return <div></div>
}
