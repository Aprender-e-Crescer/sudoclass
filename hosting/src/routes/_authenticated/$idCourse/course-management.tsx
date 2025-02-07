import { CardComponent } from '@/components/custom/card-bolletin-board'
import CardManagement from '@/components/custom/card-management'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useCourseManagementController } from '@/controllers/course-management-controller'
import { createFileRoute, Link } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/$idCourse/course-management')({
  component: CourseManagement,
})

function CourseManagement() {
  const { idCourse } = Route.useParams()
  const { course, classes } = useCourseManagementController(idCourse)

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
        <div className="mb-5">
          <ManagementHeader title={course.name} Subtitle="Turmas" buttonText="+ Nova turma" />
        </div>
        <div className="flex flex-col gap-y-5 px-6">
          {classes.map(({ id, name }) => (
            <div key={id} className="w-full">
              <Link to={`/${idCourse}/${id}/classes-management`} className="block">
                <CardManagement name={name} type="class" confirmationTitle="Deseja excluir esse curso?" />
              </Link>
            </div>
          ))}
        </div>
      </When>
    </>
  )
}
