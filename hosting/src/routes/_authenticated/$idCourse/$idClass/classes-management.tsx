import { CardComponent } from '@/components/custom/card-bolletin-board'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/$idCourse/$idClass/classes-management')({
  component: ClassesManagement,
})

function ClassesManagement() {
  const { idCourse, idClass } = Route.useParams()
  const courseQueryOptions = getCourseQueryOptions(idCourse)
  const subjectsQueryOptions = getSubjectsQueryOptions(idCourse, idClass)

  const { data: course } = useSuspenseQuery(courseQueryOptions)
  const { data: subjects } = useSuspenseQuery(subjectsQueryOptions)

  const handleEdit = () => {
    console.log('editando')
  }
  const handleDelete = () => {
    console.log('apagando')
  }

  return (
    <>
      <When condition={subjects.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Esta turma ainda não tem matérias. Que tal criar a primeira?"
          blueButtonText="Criar matéria"
          whiteButtonText="Cancelar"
          linkToBlueButton="/"
          linkToWhiteButton="/"
        />
      </When>
      <When condition={subjects.length > 0}>
        <div className="mb-5">
          <ManagementHeader
            title={course.name}
            Subtitle="Matérias"
            buttonText="+ Nova matéria"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <div className="flex flex-col gap-y-5 px-6">
          {subjects.map(({ id, color, name }) => (
            <div key={id} className="w-full">
              <Link to={`/${idCourse}/${id}/classes-management`} className="block">
                <CardComponent color={color} name={name} courseName={course.name} />
              </Link>
            </div>
          ))}
        </div>
      </When>
    </>
  )
}
