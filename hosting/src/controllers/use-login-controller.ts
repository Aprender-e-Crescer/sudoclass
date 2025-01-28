import { useLoginMutation } from '@/mutations/use-login-mutation'
import { useAuthStateReady } from '@/queries/use-auth-state-ready-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'

export function useLoginController() {
  const { data: isAuthStateReady } = useAuthStateReady()
  const { data: currentUser } = useCurrentUserQuery(isAuthStateReady)

  const { mutateAsync: login } = useLoginMutation({
    onError: (error) => {
      console.error('Erro durante a autenticação:', error.message)
    },
  })

  return { login, isUserLoggedIn: !!currentUser }
}
