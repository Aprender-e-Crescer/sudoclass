import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'
import { useListSubjectsQuery } from '@/queries/use-list-subjects-query'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/',
)({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  const {
    data: subjects,
    isError,
    error,
  } = useListSubjectsQuery('aQjvxCKlEuHc9YQEedCQ')

  if (isError) {
    console.error('Erro na consulta:', error)
  }

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {subjects?.map((subject) => (
        <CardSubject
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
      />
      <CardSubject
        description="..."
        name="Marketing"
        backgroundColor="vermelho"
      />
      <CardSubject
        description="Programação Orientada a Objetos"
        name="POO"
        backgroundColor="azul"
      />
      <CardSubject
        description="..."
        name="Algoritmos"
        backgroundColor="ciano"
      />
    </div>
  )
}
