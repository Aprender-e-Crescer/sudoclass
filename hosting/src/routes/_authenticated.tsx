import LeftMenu from '@/components/custom/left-menu'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUser } from '@/queries/use-get-user'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location: { pathname } }) => {
    await auth.authStateReady()

    if (!auth.currentUser && pathname !== '/login') throw redirect({ to: '/login' })
  },
  component: Authenticated,
})

export function Authenticated() {
  // const currentUser = useCurrentUserQuery()
  // const { data: User } = useGetUser(currentUser?.uid)

  // console.log(User)

  return (
    <div className="flex">
      <LeftMenu type="StudentPortal" />
      <div className="flex-1 ml-5">
        <Outlet />
      </div>
    </div>
  )
}
