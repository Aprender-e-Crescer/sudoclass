import { toast } from '@/hooks/use-toast'
import { useUpdateCredentialsMutation } from '@/mutations/use-update-credentials-mutation'
import { getProfileQueryOptions } from '@/queries/use-get-profile-query'
import { getPasswordRequestsQueryOptions } from '@/queries/use-password-request-query'
import { useQueries, useSuspenseQuery } from '@tanstack/react-query'

export function usePasswordChangeController() {
  const passwordRequestsQueryOptions = getPasswordRequestsQueryOptions()
  const { data: profileRefs } = useSuspenseQuery(passwordRequestsQueryOptions)

  const profilesQueries = useQueries({
    queries: profileRefs?.map(({ profileRef }) => getProfileQueryOptions(profileRef)) ?? [],
  })
  const profiles = profilesQueries.filter(({ data }) => data).map(({ data }) => data!)

  const { mutate: updateCredentials } = useUpdateCredentialsMutation({
    onError: (error) => {
      toast({
        title: 'Erro ao aceitar troca de senha',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso!',
        description: 'Senha trocada com sucesso!',
        variant: 'success',
      })
    },
  })

  return {
    profiles,
    updateCredentials,
  }
}
