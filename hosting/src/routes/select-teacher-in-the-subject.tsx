import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/select-teacher-in-the-subject')({
  component: SelectionTeacher,
})

export function SelectionTeacher() {
  return <div></div>
}
