import { auth } from '@/services/firebase'
import { queryOptions, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { onAuthStateChanged } from 'firebase/auth'

export const QUERY_KEY_CURRENT_USER = ['currentUser']
const QUERY_KEY_CURRENT_USER_SUBSCRIPTION = ['currentUserSubscription']
export const currentUserQueryOptions = (isAuthStateReady = true) => queryOptions({
  queryKey: QUERY_KEY_CURRENT_USER,
  queryFn: async () => auth.currentUser,
  enabled: isAuthStateReady,
})

export function useCurrentUserQuery(isAuthStateReady: boolean | undefined) {
  const queryClient = useQueryClient()

  const result = useSuspenseQuery(currentUserQueryOptions(isAuthStateReady))

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
    enabled: isAuthStateReady,
  })

  return result
}
