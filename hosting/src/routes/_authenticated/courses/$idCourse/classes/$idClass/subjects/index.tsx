import { createFileRoute, Link } from '@tanstack/react-router'
import { CustomLoading } from '@/components/custom/custom-loading'
import { useGetSubjectsQuery } from '@/queries/use-get-subjects-query'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/subjects/')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { idClass, idCourse } = Route.useParams()

  const { data: subjects, isError, error, isLoading } = useGetSubjectsQuery(idCourse, idClass)

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

  return (
    <div>
      <p className="w-full flex justify-center text-3xl font-bold mb-5 text-[#0B366F]">Materias</p>
      <div className="flex flex-wrap gap-5 justify-center items-center mt-6">
        {subjects?.map(({ id, name, color }) => (
          <Link to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/warnings" params={{ idSubject: id }} key={id}>
            <div
              className="w-[200px] md:w-[400px] h-[200px] rounded-lg shadow-lg flex flex-col justify-between"
              style={{ backgroundColor: color }}
            >
              <div className="flex justify-between m-6">
                <div className="flex flex-col">
                  <div className="text-white font-bold text-xl mr-5 mb-1">{name}</div>
                </div>
              </div>
              <div className="bg-white w-full rounded-b-lg py-6"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
