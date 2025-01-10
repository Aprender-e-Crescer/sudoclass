import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import avatarpng from '@/assets/avatar.png'
import { useGetFullUser } from '@/hooks/use-get-full-user'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location: { pathname } }) => {
    await auth.authStateReady()

    if (!auth.currentUser && pathname !== '/login') throw redirect({ to: '/login' })
  },
  component: Authenticated,
})

export function Authenticated() {
  const user = useGetFullUser()

  if (!user) return null

  return (
    <div className="flex">
      <div className="flex-col flex w-full">
        <Header avatarFallBack="" avatarImage={avatarpng} />
        <div className="flex">
          <LeftMenu type={user.type} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
