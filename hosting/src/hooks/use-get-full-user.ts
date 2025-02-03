import { useAuthStateReady } from '@/queries/use-auth-state-ready-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export function useGetFullUser() {
  const router = useRouter()

  const { data: isAuthStateReady } = useAuthStateReady()
  const { data: currentUser } = useCurrentUserQuery(isAuthStateReady)
  const { data: user } = useGetUserQuery(currentUser?.uid)

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
