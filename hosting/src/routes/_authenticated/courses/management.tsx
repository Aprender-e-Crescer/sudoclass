import CardManagement from '@/components/custom/card-management'
import CourseDialog from '@/components/custom/course-dialog'
import ManagementHeader from '@/components/custom/management-header'
import NotFound from '@/components/custom/not-found'
import { useCoursesManagementController } from '@/controllers/courses-management-controller'
import { Course } from '@/models/course-schema'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { When } from 'react-if'

export const Route = createFileRoute('/_authenticated/courses/management')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(
      currentUserQueryOptions(),
    )
    const user = (
      await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
    ).data()
    if (user?.role != 'admin') throw redirect({ to: '/' })
  },
  component: Index,
})

function Index() {
  const { courses, createCourse, editCourse, deleteCourse } =
    useCoursesManagementController()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCourseInDialog, setCurrentCourseInDialog] = useState<Course>()

  const editingCourseId = currentCourseInDialog?.id

  const handleEdit = (course: Course) => {
    setCurrentCourseInDialog(course)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteCourse(id)
  }

  return (
    <>
      <div className="mb-5">
        <ManagementHeader
          title="Cursos"
          buttonText="+ Novo curso"
          onCreate={() => {
            setCurrentCourseInDialog(undefined)
            setIsDialogOpen(true)
          }}
        />
      </div>

      <CourseDialog
        title={editingCourseId ? 'Editar curso' : 'Novo curso'}
        subTitle={
          editingCourseId ? 'Edite seu curso.' : 'Cadastre seu novo curso.'
        }
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mutation={
          editingCourseId
            ? (data) => editCourse({ id: editingCourseId, ...data })
            : createCourse
        }
        initialValues={currentCourseInDialog}
      />

      <When condition={courses?.length === 0}>
        <NotFound
          title="Ops! Nada por aqui..."
          description="Nenhum curso por aqui. Que tal criar o primeiro?"
        />
      </When>

      <When condition={courses.length > 0}>
        <div className="flex flex-col gap-y-5 px-6 sm:mx-16">
          {courses
            .filter((course) => course.id != undefined)
            .map(({ id, color, name }) => (
              <div key={id} className="w-full">
                <Link to="/courses/$idCourse" params={{ idCourse: id }} className="block">
                  <CardManagement
                    name={name}
                    type="course"
                    color={color}
                    confirmationTitle="Deseja excluir esse curso?"
                    onEdit={() => handleEdit({ id, color, name })}
                    onDelete={() => handleDelete(id!)}
                  />
                </Link>
              </div>
            ))}
        </div>
      </When>
    </>
  )
}
