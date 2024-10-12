import { ActivitiesMaterials } from '@/components/custom/activities-materials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-component')({
  component: RouteActivitiesMaterials,
})

function RouteActivitiesMaterials() {
  return (
    <div>
      <ActivitiesMaterials
        title="Atividade 1"
        dataAtv="11-10-2024"
        instructions='Análise de Texto: "Leia o texto indicado e faça uma análise crítica, destacando os principais argumentos do autor. Em seguida, elabore uma reflexão pessoal de, no mínimo, 300 palavras, conectando o conteúdo do texto com temas abordados em sala de aula."'
        iconColor='bg-yellow-500'
      />
      <ActivitiesMaterials
        title="Atividade 2"
        dataAtv="12-11-2024"
        instructions='Pesquisa em Grupo: "Formem grupos de até quatro pessoas e realizem uma pesquisa sobre o impacto das tecnologias sustentáveis no meio ambiente. Apresentem os resultados por meio de uma apresentação em PowerPoint com no máximo 10 slides."'
        iconColor='bg-blue-500'
      />
      <ActivitiesMaterials
        title="Atividade 3"
        dataAtv="22-01-2020"
        instructions='Resolução de Problemas: "Resolva os cinco problemas matemáticos fornecidos no material da aula. Cada solução deve ser acompanhada de uma explicação detalhada do raciocínio utilizado para chegar à resposta correta."'
        iconColor='bg-orange-500'
      />
    </div>
  )
}
