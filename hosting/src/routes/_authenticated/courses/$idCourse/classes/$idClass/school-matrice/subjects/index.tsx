import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query'
import { CustomLoading } from '@/components/custom/custom-loading'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { data, isError, error, isLoading } = useListSubjectsQuery()
  const colors = ['amarelo', 'azul', 'vermelho', 'laranja', 'rosa', 'ciano', 'verde', 'roxo', 'marrom']

  const { idClass, idCourse } = Route.useParams()

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
  console.log(data)
  const subjects = Array.isArray(data) ? data : []
  console.log('subjects:', subjects)

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center mt-6">
      {subjects.map((subject: any, index: number) => (
        <CardSubject
          id={subject.id_materia}
          idClass={idClass}
          idCourse={idCourse}
          key={subject.id_materia}
          description="Aprender & Crescer"
          name={subject.nome_materia}
          backgroundColor={colors[index % colors.length]}
        />
      ))}
    </div>
  )
}
