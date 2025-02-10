import { CardComponent } from '@/components/custom/card-bolletin-board'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useClassesManagementController } from '@/controllers/classes-management-controller'
import { createFileRoute, Link } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/courses-management/course/$idCourse/class/$idClass/')({
  component: Index,
})

function Index() {
  const { idCourse, idClass } = Route.useParams()

  const { course, subjects } = useClassesManagementController(idCourse, idClass)

  return (
    <>
      <When condition={subjects.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Esta turma ainda não tem matérias. Que tal criar a primeira?"
          blueButtonText="Criar matéria"
          whiteButtonText="Cancelar"
          linkToBlueButton="/"
          linkToWhiteButton={`/courses-management/course/${idCourse}`}
        />
      </When>
      <When condition={subjects.length > 0}>
        <div className="mb-5">
          <ManagementHeader title={course.name} Subtitle="Matérias" buttonText="+ Nova matéria" />
        </div>
        <div className="flex flex-col gap-y-5 px-6">
          {subjects.map(({ id, color, name }) => (
            <div key={id} className="w-full">
              <Link to={`/courses/${idCourse}/classes/${idClass}/subjects/${id}/mural/warnings`} className="block">
                <CardComponent color={color} name={name} courseName={course.name} />
              </Link>
            </div>
          ))}
        </div>
      </When>
    </>
  )
}
