import { useState } from 'react'
import { CardComponent } from '@/components/custom/card-bolletin-board'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getClassesQueryOptions } from '@/queries/use-get-classes-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getStudentPersonalClassesQueryOptions } from '@/queries/use-student-personal-classes-query'
import { getTeacherPersonalSubjectsQueryOptions } from '@/queries/use-teacher-personal-subjects-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
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
  const fullUser = useGetFullUser()
  const { idCourse } = Route.useParams()

  const studentPersonalClassesQueryOptions = getStudentPersonalClassesQueryOptions(fullUser.role, fullUser.roleRef)
  const teacherPersonalSubjectsQueryOptions = getTeacherPersonalSubjectsQueryOptions(fullUser.role, fullUser.roleRef)

  const { data: student } = useQuery(studentPersonalClassesQueryOptions)
  const { data: teacher } = useQuery(teacherPersonalSubjectsQueryOptions)

  const classesQueryOptions = getClassesQueryOptions(idCourse, fullUser.role, student?.classes, teacher?.subjects)
  const courseQueryOptions = getCourseQueryOptions(idCourse)

  const { data: course } = useQuery(courseQueryOptions)
  const { data: classes } = useSuspenseQuery(classesQueryOptions)

  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [operationType, setOperationType] = useState<'edit' | 'delete' | null>(null)

  if (!course) return

  const handleEdit = () => {
    setIsSelecting(true)
    setOperationType('edit')
  }

  const handleDelete = () => {
    setIsSelecting(true)
    setOperationType('delete')
  }

  const toggleSelectClass = (id: string) => {
    setSelectedClass((prev) => (prev === id ? null : id))
  }

  const handleConfirmation = () => {
    if (operationType === 'edit' && selectedClass) return 'mutation p/editar'
    if (operationType === 'delete' && selectedClass) return 'mutation p/deletar'
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
        <ManagementHeader title={course.name} buttonText="+ Nova turma" onEdit={handleEdit} onDelete={handleDelete} />
        <div className="flex flex-col gap-y-5 px-6">
          {classes?.map(({ id, color, name }) => (
            <div key={id} className="flex items-center justify-center w-full">
              {isSelecting && (
                <input
                  type="checkbox"
                  checked={selectedClass === id}
                  onChange={() => toggleSelectClass(id)}
                  className="w-5 h-5 mr-4"
                />
              )}
              <CardComponent color={color} name={name} courseName={course?.name} />
            </div>
          ))}
        </div>
        {isSelecting && (
          <button onClick={handleConfirmation} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
            Confirmar seleção
          </button>
        )}
      </When>
    </>
  )
}
