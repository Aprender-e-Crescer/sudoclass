import { SubHeader } from '@/components/custom/subheader'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

function getUserType() {
  const currentUser = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.data?.uid)
  console.log(user?.type)
  return user?.type
}

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/_mural',
)({
  component: () => (
    <div className="mt-3 mb-2">
      <SubHeader hasPrivilege={getUserType()} />
      <Outlet />
    </div>
  ),
})
