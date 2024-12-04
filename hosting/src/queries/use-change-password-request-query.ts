import { userRequestChangePasswordSchema } from '@/models/user-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function usePasswordChangeListingQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get("/trocasenha/usuario")

      const user = z.array(userRequestChangePasswordSchema).parse(data)
      return user
    },
  })
}