import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/details',
)({
  component: () => (
    <div>
      Hello
      /_authenticated/courses/$idCourse/classes/school-matrice/discipline-syllabus!
    </div>
  ),
})
