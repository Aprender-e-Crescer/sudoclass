import { createFileRoute } from '@tanstack/react-router'
import { CardComponent } from '../components/custom/card-bolletin-board'

export const Route = createFileRoute('/card-bolletin')({
  component: () => (
    <div>
      <CardComponent matter="Sua Matéria" description="Descrição da sua matéria." />
    </div>
  ),
})
