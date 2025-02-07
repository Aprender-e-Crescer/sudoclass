import CardManagement from '@/components/custom/card-management'
import CreateCourseDialog from '@/components/custom/create-course-dialog'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useCreateCourseMutation } from '@/mutations/use-create-course-mutation'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getCoursesQueryOptions } from '@/queries/use-get-courses-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/courses-management')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)
  },
  component: CoursesManagement,
})

function CoursesManagement() {
  const fullUser = useGetFullUser()
  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)

  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const coursesQueryOptions = getCoursesQueryOptions(fullUser.role, student?.classes, teacher?.subjects)
  const { data: courses } = useSuspenseQuery(coursesQueryOptions)

  const { mutate: createCourse } = useCreateCourseMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <When condition={courses?.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Nenhum curso por aqui. Que tal criar o primeiro?"
          blueButtonText="Criar curso"
          whiteButtonText="Cancelar"
          linkToBlueButton="/"
          linkToWhiteButton="/"
        />
      </When>

      <div className="mb-5">
        <ManagementHeader title="Cursos" buttonText="+ Novo curso" onCreate={() => setIsDialogOpen(true)} />
      </div>

      <CreateCourseDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} createCourse={createCourse} />

      <div className="flex flex-col gap-y-5 px-6">
        {courses.map(({ id, name }) => (
          <div key={id} className="w-full">
            <Link to={`/${id}/course-management`} className="block">
              <CardManagement name={name} confirmationTitle="Deseja excluir esse curso?" />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
