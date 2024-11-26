import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject',
)({
  component: () => (
    <div>
      Hello
      /_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject!
      <Outlet/>
      <Outlet />
    </div>
  ),
})
