import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('home/list-subjects')({
    component: ListSubjects,
})

export function ListSubjects() {
  return <div>nessa listagem, ao clicar na matéria vai passar o id como parametro</div>
}