import { CardComponent } from '@/components/custom/card-bolletin-board'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useCoursesManagementController } from '@/controllers/courses-management-controller'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { createFileRoute, Link } from '@tanstack/react-router'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/$idCourse/courses-management')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
    const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    const role = getRoleFromRef(user?.roleRef)
  },
  component: CoursesManagement,
})

function CoursesManagement() {
  const { idCourse } = Route.useParams()
  const { course, classes } = useCoursesManagementController(idCourse)

  const handleEdit = () => {
    console.log('editando')
  }
  const handleDelete = () => {
    console.log('apagando')
  }
  classes.map((item) => {
    if (!item?.id) {
      console.log(`Item sem ID encontrado no índice:`, item)
    }
  })

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
          <ManagementHeader
            title={course.name}
            Subtitle="Turmas"
            buttonText="+ Nova turma"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <div className="flex flex-col gap-y-5 px-6">
          {classes.map(({ id, color, name }) => (
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
