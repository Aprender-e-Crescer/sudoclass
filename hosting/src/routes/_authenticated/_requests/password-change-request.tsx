import CardChangePassword from '@/components/custom/card-change-password'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { getPasswordRequestsQueryOptions } from '@/queries/use-password-request-query'
import { useQueries, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_requests/password-change-request')({
  component: PasswordChangeRequest,
})

function PasswordChangeRequest() {
  const passwordRequestsQueryOptions = getPasswordRequestsQueryOptions()
  const { data: profileRefs } = useSuspenseQuery(passwordRequestsQueryOptions)

  const profilesQueries = useQueries({
    queries: profileRefs?.map(({ profileRef }) => getProfileQueryOptions(profileRef)) ?? [],
  })
  const profiles = profilesQueries.filter(({ data }) => data).map(({ data }) => data!)

  return (
    <div className="mt-3">
      {profiles.map(({ id, displayName, photoURL }) => (
        <div key={id} className="flex flex-col justify-center items-center mx-20 mb-3">
          <CardChangePassword name={displayName} avatarUrl={photoURL!} />
        </div>
      ))}
    </div>
  )
}
