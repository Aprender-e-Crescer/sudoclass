import { useAuthStateReady } from '@/queries/use-auth-state-ready-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

export function useGetFullUser() {
  const { data: isAuthStateReady } = useAuthStateReady()
  const { data: currentUser } = useCurrentUserQuery(isAuthStateReady)
  const { data: user } = useGetUserQuery(currentUser?.uid)

  const type = user?.roleRef.path.split('/')[0].slice(0, -1) as 'teacher' | 'student' | 'admin' | 'responsible' | undefined

  return currentUser ? {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    email: currentUser.email,
    uid: currentUser.uid,
    cpf: currentUser.uid,
    type,
  } : null
}
