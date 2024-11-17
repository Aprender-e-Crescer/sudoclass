import { auth } from '@/services/firebase'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'

export const QUERY_KEY_CURRENT_USER = ['currentUser']
const QUERY_KEY_CURRENT_USER_SUBSCRIPTION = ['currentUserSubscription']

export function useCurrentUserQuery() {
  const queryClient = useQueryClient()

  const result = useQuery({
    initialData: auth.currentUser ? auth.currentUser : null,
    queryKey: QUERY_KEY_CURRENT_USER,
    queryFn: async () => {
      await auth.authStateReady()

      return auth.currentUser ? auth.currentUser : null
    },
  })

  useQuery({
    queryKey: QUERY_KEY_CURRENT_USER_SUBSCRIPTION,
    queryFn: () => {
      queryClient.getQueryData<() => void>(QUERY_KEY_CURRENT_USER_SUBSCRIPTION)?.()
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        queryClient.setQueryData(QUERY_KEY_CURRENT_USER, user ? user : null)
      })
      return () => {
        unsubscribe()
      }
    },
  })
  return result
}
