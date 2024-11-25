import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query'

export const Route = createFileRoute('/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const { data: subjects, isError, error } = useListSubjectsQuery('aQjvxCKlEuHc9YQEedCQ')

  if (isError) {
    console.error('Erro na consulta:', error)
  }
  const { idClass, idCourse } = Route.useParams()

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {subjects?.map((subject) => (
        <CardSubject
          id={subject.id}
          idClass={idClass}
          idCourse={idCourse}
          key={subject.id}
          description={subject.description}
          name={subject.name}
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
    </div>
  )
}
