import { userSchema } from '@/models/user-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useGetUser(uid: string) {
  return useQuery({
    queryKey: ['get-user', uid],
    queryFn: async () => {
      if (!uid) {
        throw new Error('UID é obrigatório para buscar o tipo de usuário.')
      }

      const { data } = await api.get(`/usuarios/{uid}`)
      const user = z.array(userSchema).parse(data)

      return user
    },
  })
}
