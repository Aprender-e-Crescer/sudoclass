import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { data, isError, error, isLoading } = useListSubjectsQuery()

  const { idClass, idCourse } = Route.useParams()

  if (isLoading) {
    return <p>Carregando matérias...</p>
  }

  if (isError) {
    console.error('Erro na consulta:', error)
    return <p>Erro ao carregar matérias. Tente novamente mais tarde.</p>
  }
  console.log(data)
  const subjects = Array.isArray(data) ? data : []
  console.log('subjects:', subjects)

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center min-h-screen">
      {subjects.map((subject: any) => (
        <CardSubject
          id={subject.id_materia}
          idClass={idClass}
          idCourse={idCourse}
          key={subject.id_materia}
          description={subject.description}
          name={subject.nome_materia}
          backgroundColor="amarelo"
        />
      ))}

      <CardSubject
        description="Processo de Desenvolvimento de Sistemas"
        name="PDS"
        backgroundColor="amarelo"
        id="1"
        idClass="1"
        idCourse="1"
      />
      <CardSubject description="Marketing" name="Marketing" backgroundColor="azul" id="2" idClass="1" idCourse="1" />
    </div>
  )
}
