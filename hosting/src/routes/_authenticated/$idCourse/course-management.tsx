import { CardComponent } from '@/components/custom/card-bolletin-board'
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

  const handleEdit = () => {
    console.log('editando')
  }
  const handleDelete = () => {
    console.log('apagando')
  }

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
            type="with edits"
            title={course.name}
            Subtitle="Turmas"
            confirmationTitle="Deseja excluir o curso?"
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
    // <>
    //   <When condition={subjects.length === 0}>
    //     <NotFound
    //       title="Ops! Nada por aqui..."
    //       description="Esta turma ainda não tem matérias. Que tal criar a primeira?"
    //       blueButtonText="Criar matéria"
    //       whiteButtonText="Cancelar"
    //       linkToBlueButton="/"
    //       linkToWhiteButton="/"
    //     />
    //   </When>
    //   <When condition={subjects.length > 0}>
    //     <div className="mb-5">
    //       <ManagementHeader
    //         title={course.name}
    //         Subtitle="Matérias"
    //         dialogTitle="Deseja excluir a turma?"
    //         buttonText="+ Nova matéria"
    //         onEdit={handleEdit}
    //         onDelete={handleDelete}
    //       />
    //     </div>
    //     <div className="flex flex-col gap-y-5 px-6">
    //       {subjects.map(({ id, color, name }) => (
    //         <div key={id} className="w-full">
    //           <Link to={`/${idCourse}/${id}/classes-management`} className="block">
    //             <CardComponent color={color} name={name} courseName={course.name} />
    //           </Link>
    //         </div>
    //       ))}
    //     </div>
    //   </When>
    // </>
  )
}
