import { createFileRoute } from '@tanstack/react-router'
import { useGetCoursesQuery } from '@/queries/use-get-courses-query'
import { CardColor } from '@/components/custom/card-color'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/courses/')({
  component: HomeListCourses,
})

function HomeListCourses() {
  const { data, isError, error, isLoading } = useGetCoursesQuery()

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Loader2 />
      </div>
    )
  }

  if (isError) {
    console.error('Erro na consulta:', error)
    return <p>Erro ao carregar cursos. Tente novamente mais tarde.</p>
  }
  const courses = Array.isArray(data) ? data : []

  return (
    <div>
      <p className="w-full flex justify-center text-3xl font-bold mb-5 text-[#0B366F]">Cursos</p>

      <div className="flex flex-wrap gap-5 justify-center items-center mt-6">
        {courses.map((course: any) => (
          <CardColor key={course.id} name={course.name} idClass="elmW6W9gPuX2NdR1ruXB" idCourse={course.id} />
        ))}
      </div>
    </div>
  )
}
