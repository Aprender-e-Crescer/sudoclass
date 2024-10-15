import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '../components/custom/card-bolletin-board' // Ajuste o caminho se necessário

export const Route = createFileRoute('/card-bolletin')({
  component: () => (
    <div>
      <CardComponent materia="Sua Matéria" descricao="Descrição da sua matéria." />
    </div>
  ),
})
