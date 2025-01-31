import { useAuthStateReady } from '@/queries/use-auth-state-ready-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'

export function useGetFullUser() {
  const { data: isAuthStateReady } = useAuthStateReady()
  const { data: currentUser } = useCurrentUserQuery(isAuthStateReady)
  const { data: user } = useGetUserQuery(currentUser?.uid)

  const role = getRoleFromRef(user?.roleRef)

  return currentUser ? {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    email: currentUser.email,
    uid: currentUser.uid,
    cpf: currentUser.uid,
    role,
    roleRef: user?.roleRef,
    profileRef: user?.profileRef,
  } : null
}
