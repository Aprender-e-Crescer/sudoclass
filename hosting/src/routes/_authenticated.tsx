import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { auth } from '@/services/firebase'
import { createFileRoute, Navigate, Outlet, redirect } from '@tanstack/react-router'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { useProfileImage } from '@/hooks/use-profile-image'
import { signOut } from 'firebase/auth'
import { getUserQueryOptions } from '@/queries/use-get-user-query'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location: { pathname }, context: { queryClient } }) => {
    if (!auth.currentUser && pathname !== '/login') throw redirect({ to: '/login' })

    await queryClient.ensureQueryData(getUserQueryOptions(auth.currentUser?.uid))
  },
  component: Authenticated,
})

export function Authenticated() {
  const user = useGetFullUser()
  const { avatarImage } = useProfileImage()

  const logout = () => {
    signOut(auth)
  }

  if (!user) return <Navigate to="/login" />

  return (
    <div className="flex h-full">
      <div className="flex-col flex w-full">
        <Header avatarFallBack="" avatarImage={avatarImage} logout={logout} />
        <div className="flex  h-full">
          <LeftMenu type={user.type} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
