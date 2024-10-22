import { createFileRoute } from '@tanstack/react-router'
import { CardSubject } from '@/components/custom/card-subject'

export const Route = createFileRoute('/home-list-subjects')({
  component: HomeListSubjects,
})

function HomeListSubjects() {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <CardSubject description="Processo de Desenvolvimento de Sistemas" name="PDS" backgroundColor="amarelo" />
      <CardSubject description="..." name="Marketing" backgroundColor="vermelho" />
      <CardSubject description="Programação Orientada a Objetos" name="POO" backgroundColor="azul" />
      <CardSubject description="..." name="Algoritmos" backgroundColor="laranja" />
    </div>
  )
}
