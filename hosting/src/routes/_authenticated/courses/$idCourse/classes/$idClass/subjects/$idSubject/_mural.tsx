import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/_mural',
)({
  component: () => <div>Hello /_authenticated/_mural!</div>,
})
