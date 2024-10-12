import { ActivitiesMaterialsTeacher, ActivitiesMaterialsStudent } from '@/components/custom/activities-materials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-component')({
  component: RouteActivitiesMaterials,
})

function RouteActivitiesMaterials() {
  return (
    <div>
      <h1>Visao Professor:</h1>
      <ActivitiesMaterialsTeacher
        title="Atividade 1"
        dataAtv="11-10-2024"
        instructions='Análise de Texto: "Leia o texto indicado e faça uma análise crítica, destacando os principais argumentos do autor. Em seguida, elabore uma reflexão pessoal de, no mínimo, 300 palavras, conectando o conteúdo do texto com temas abordados em sala de aula."'
        iconColor="bg-yellow-500"
        assigned={30}
        pending={1}
      />
      <h1>Visao Aluno:</h1>
      <ActivitiesMaterialsStudent
        title="Atividade 1"
        dataAtv="11-10-2024"
        instructions='Análise de Texto: "Leia o texto indicado e faça uma análise crítica, destacando os principais argumentos do autor. Em seguida, elabore uma reflexão pessoal de, no mínimo, 300 palavras, conectando o conteúdo do texto com temas abordados em sala de aula."'
        iconColor="bg-yellow-500"
        isSubmitted={false}
      />
      <ActivitiesMaterialsStudent
        title="Atividade 1"
        dataAtv="11-10-2024"
        instructions='Análise de Texto: "Leia o texto indicado e faça uma análise crítica, destacando os principais argumentos do autor. Em seguida, elabore uma reflexão pessoal de, no mínimo, 300 palavras, conectando o conteúdo do texto com temas abordados em sala de aula."'
        iconColor="bg-yellow-500"
        isSubmitted={true}
      />
    </div>
  )
}
