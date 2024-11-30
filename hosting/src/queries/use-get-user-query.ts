import { userSchema } from '@/models/user-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetUserQuery(uid: string | undefined) {
  return useQuery({
    queryKey: ['get-user', uid],
    queryFn: async () => {
      const { data } = await api.get(`/usuario/${uid}`)
      const user = userSchema.parse(data)

      return user
    },
    enabled: !!uid,
  })
}
