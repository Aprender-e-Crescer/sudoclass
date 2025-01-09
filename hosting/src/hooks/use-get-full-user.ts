import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { useGetUserQuery } from '@/queries/use-get-user-query'

export function useGetFullUser() {
  const { data: currentUser } = useCurrentUserQuery()
  const { data: user } = useGetUserQuery(currentUser?.uid)

  if (!currentUser || !user) return null;

  const type = user.roleRef.path.split('/')[0].slice(0, -1) as 'teacher' | 'student' | 'admin' | 'responsible'

  return {
    displayName: currentUser.displayName,
    email: currentUser.email,
    cpf: currentUser.uid,
    type,
  }
}
