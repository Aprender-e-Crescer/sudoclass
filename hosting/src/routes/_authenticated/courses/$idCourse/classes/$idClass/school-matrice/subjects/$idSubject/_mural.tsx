import { SubHeader } from '@/components/custom/subheader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural',
)({
  component: () => (
    <div className="mt-3 mb-2">
      <SubHeader hasPrivilege="teacher" />
      <Outlet />
    </div>
  ),
})
