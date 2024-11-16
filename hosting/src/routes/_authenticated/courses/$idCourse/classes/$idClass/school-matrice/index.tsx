import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/',
)({
  component: () => (
    <div>Hello /_authenticated/courses/$idCourse/classes/school-matrice/!</div>
  ),
})
