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
  const { course, classes, deleteClass } = useCourseManagementController(idCourse)
  const navigate = Route.useNavigate()

  function dateConverter(date: Date) {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const shiftDictionary: Record<string, string> = {
    morning: 'Manhã',
    afternoon: 'Tarde',
    night: 'Noite',
  }

  function shiftTranslate(shift: string) {
    return shiftDictionary[shift]
  }

  const handleCreate = () => {
    navigate({ to: `/register/${idCourse}/class`, search: { action: 'create' } })
  }

  const handleEdit = (idClass: string) => {
    navigate({ to: `/register/${idCourse}/class`, search: { idClass, action: 'edit' } })
  }

  const handleDelete = (idClass: string) => {
    deleteClass({ idCourse, idClass })
  }

  return (
    <>
      <When condition={classes?.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Este curso ainda não tem turmas. Que tal criar a primeira?"
          blueButtonText="Criar turma"
          whiteButtonText="Cancelar"
          linkToBlueButton={`/register/${idCourse}/class?action=create`}
          linkToWhiteButton="/courses-management"
        />
      </When>
      <When condition={classes?.length > 0}>
        <div className="mb-5">
          <ManagementHeader
            title={course.name}
            Subtitle="Turmas"
            buttonText="+ Nova turma"
            buttonRedirection={`/register/${idCourse}/class?action=create`}
            onCreate={() => handleCreate()}
          />
        </div>
        <div className="flex flex-col gap-y-5 px-6 mx-16">
          {classes.map(({ id, name, endDate, startDate, shift }) => (
            <div key={id} className="w-full">
              <Link to={`/${idCourse}/${id}/classes-management`} className="block">
                <CardManagement
                  name={name}
                  type="class"
                  startDate={dateConverter(startDate)}
                  endDate={dateConverter(endDate)}
                  shift={shiftTranslate(shift)}
                  onEdit={() => handleEdit(id)}
                  onDelete={() => handleDelete(id)}
                  confirmationTitle="Deseja excluir esse curso?"
                />
              </Link>
            </div>
          ))}
        </div>
      </When>
    </>
  )
}
