import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('home/list-subjects/$subjectId/mural')({
  component: Mural,
})

export function Mural() {
  return <div>Informações mural</div>
}
