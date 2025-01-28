import { Header } from '@/components/custom/header'
import LeftMenu from '@/components/custom/left-menu'
import { auth } from '@/services/firebase'
import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { signOut } from 'firebase/auth'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { authStateReadyQueryOptions } from '@/queries/use-auth-state-ready-query'
import { useEffect } from 'react'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ matches, context: { queryClient } }) => {
    const isAuthStateReady = await queryClient.ensureQueryData(authStateReadyQueryOptions)
    const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions(isAuthStateReady))
    
    const isUserInsideAuthenticatedBoundaries = matches[1].id === '/_authenticated'

    if (!currentUser && isUserInsideAuthenticatedBoundaries) throw redirect({ to: '/login' })

    await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
  },
  component: Authenticated,
})

export function Authenticated() {
  const fullUser = useGetFullUser()

  const router = useRouter()

  useEffect(() => {
    if (fullUser) return

    router.invalidate()
  }, [fullUser])

  const logout = () => {
    signOut(auth)
  }

  return (
    <div className="flex h-full">
      <div className="flex-col flex w-full">
        <Header avatarFallBack="" avatarImage={fullUser?.photoURL} logout={logout} />
        <div className="flex  h-full">
          <LeftMenu type={fullUser?.type} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
