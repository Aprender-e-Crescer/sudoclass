import { auth } from '@/services/firebase'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const QUERY_KEY_AUTH_STATE_READY = ['authStateReady']

export const authStateReadyQueryOptions = queryOptions({
  initialData: false,
  queryKey: QUERY_KEY_AUTH_STATE_READY,
  queryFn: () => auth.authStateReady().then(() => true),
})

export function useAuthStateReady() {
  const result = useQuery(authStateReadyQueryOptions)

  return result
}
