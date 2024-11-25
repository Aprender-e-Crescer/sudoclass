import { SubHeader } from '@/components/custom/subheader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural',
)({
  component: () => <div>Hello /_authenticated/_mural!       
    <Outlet/>
</div>,
  component: () => (
    <div>
      <SubHeader hasPrivilege="teacher" />
      <Outlet />
    </div>
  ),
})
