import { SubHeader } from '@/components/custom/subheader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural',
)({
  component: () => (
    <div className="flex flex-col items-center flex-1 w-full overflow-hidden">
      <SubHeader />
      <Outlet />
    </div>
  ),
})
