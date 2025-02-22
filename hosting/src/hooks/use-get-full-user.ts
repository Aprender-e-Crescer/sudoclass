import { useAuthStateReady } from '@/queries/use-auth-state-ready-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export function useGetFullUser() {
  const router = useRouter()

  const { data: isAuthStateReady } = useAuthStateReady()
  const { data: currentUser } = useCurrentUserQuery(isAuthStateReady)

  if (!currentUser) throw new Error('User is not logged in')

  const { data: user } = useSuspenseQuery(getUserQueryOptions(currentUser.uid))

  useEffect(() => {
    if (currentUser) return

    router.invalidate()
  }, [currentUser])
  
  if (!currentUser) throw new Error('User is not logged in')

  return {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    email: currentUser.email,
    uid: currentUser.uid,
    cpf: currentUser.uid,
    role: user.role,
    roleRef: user.roleRef,
    profileRef: user.profileRef,
  }
}
