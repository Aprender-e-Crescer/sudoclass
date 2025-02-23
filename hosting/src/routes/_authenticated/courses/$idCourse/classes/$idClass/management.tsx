import CardManagement from '@/components/custom/card-management'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useClassesManagementController } from '@/controllers/classes-management-controller'
import { useSubjectRegisterController } from '@/controllers/use-subject-register-controller'
import { createFileRoute, Link } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/management',
)({
  component: Index,
})

function Index() {
  const { idCourse, idClass } = Route.useParams()
  const { course, subjects } = useClassesManagementController(idCourse, idClass)
  const { deleteSubject } = useSubjectRegisterController(idCourse, idClass)
  const navigate = Route.useNavigate()

  const handleEdit = (idSubject: string) => {
    navigate({
      to: `/register/${idCourse}/${idClass}/new-subject`,
      search: { idSubject, action: 'edit' },
    })
  }
  const handleDelete = (idSubject: string) => {
    deleteSubject(idSubject)
  }

  return (
    <>
      <When condition={subjects.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Esta turma ainda não tem matérias. Que tal criar a primeira?"
          blueButtonText="Criar matéria"
          whiteButtonText="Cancelar"
          linkToBlueButton={`/register/${idCourse}/${idClass}/new-subject?action=create`}
          linkToWhiteButton={`/courses-management/course/${idCourse}`}
        />
      </When>
      <When condition={subjects.length > 0}>
        <div className="mb-5">
          <ManagementHeader
            title={course.name}
            Subtitle="Matérias"
            buttonText="+ Nova matéria"
            buttonRedirection={`/register/${idCourse}/${idClass}/new-subject?action=create`}
          />
        </div>
        <div className="flex flex-col gap-y-5 px-6">
          {subjects.map(({ id, color, name }) => (
            <div key={id} className="w-full">
              <Link
                to={`/courses/${idCourse}/classes/${idClass}/subjects/${id}/mural/warnings`}
                className="block"
              >
                <CardManagement
                  color={color}
                  name={name}
                  type="course"
                  confirmationTitle="Deseja excluir essa matéria?"
                  onEdit={() => handleEdit(id)}
                  onDelete={() => handleDelete(id)}
                />
              </Link>
            </div>
          ))}
        </div>
      </When>
    </>
  )
}
