import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useGetSubjectsQuery } from '@/queries/use-get-subjects-query'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/subjects/')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { idClass, idCourse } = Route.useParams()

  const { data, isError, error, isLoading } = useGetSubjectsQuery({ idCourse, idClass })

  if (isLoading) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <CustomLoading message="Carregando matérias" size={70} />
        </div>
      </>
    )
  }

  if (isError) {
    console.error('Erro na consulta:', error)
    return <p>Erro ao carregar matérias. Tente novamente mais tarde.</p>
  }
  const subjects = Array.isArray(data) ? data : []

  return (
    <div>
      <p className="w-full flex justify-center text-3xl font-bold mb-5 text-[#0B366F]">Materias</p>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-6">
        {subjects.map((subject: any) => (
          <CardSubject id={subject.id} idClass={idClass} idCourse={idCourse} key={subject.id} name={subject.name} color={subject.color} />
        ))}
      </div>
    </div>
  )
}
