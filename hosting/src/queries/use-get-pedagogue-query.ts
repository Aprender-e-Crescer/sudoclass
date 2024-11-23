import { pedagogueSchema } from '@/models/pedagogue-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetPedagogueQuery(id: number | undefined | null) {
  return useQuery({
    queryKey: ['get-pedagogue', id],
    queryFn: async () => {
      const { data } = await api.get(`/pedagogos/${id}`)
      const pedagogue = pedagogueSchema.parse(data)

      return pedagogue
    },
    enabled: !!id,
  })
}
