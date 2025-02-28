import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { getPasswordRequestsQueryOptions } from '@/queries/use-password-request-query'
import { useQueries, useSuspenseQuery } from '@tanstack/react-query'

export function usePasswordChangeController() {
  const passwordRequestsQueryOptions = getPasswordRequestsQueryOptions()
  const { data: requestsData, refetch } = useSuspenseQuery(passwordRequestsQueryOptions)

  const requests = requestsData ?? []

  const profilesQueries = useQueries({
    queries: requests.map(({ profileRef }) => getProfileQueryOptions(profileRef)) ?? [],
  })

  const profiles = profilesQueries
    .filter(({ data }) => data)
    .map(({ data }, index) => ({
      ...data!,
      ref: requests[index].ref,
      profileRef: requests[index].profileRef,
      requestStatus: requests[index].requestStatus,
    }))

  return {
    profiles,
    refetch,
  }
}
