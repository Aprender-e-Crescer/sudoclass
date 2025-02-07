import CardManagement from '@/components/custom/card-management'
import CourseDialog from '@/components/custom/course-dialog'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useCoursesManagementController } from '@/controllers/courses-management-controller'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
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
  const { courses, createCourse } = useCoursesManagementController()

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

      <CourseDialog
        title="Novo curso"
        subTitle="Cadastre seu novo curso."
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        createCourse={createCourse}
      />

      <div className="flex flex-col gap-y-5 px-6 mx-16">
        {courses.map(({ id, name }) => (
          <div key={id} className="w-full">
            <Link to={`/${id}/course-management`} className="block">
              <CardManagement name={name} type="course" confirmationTitle="Deseja excluir esse curso?" />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
