import { pedagogueSchema} from '@/models/pedagogue-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function usePedagogueListQuery() {
  return useQuery({
    queryKey: ['pedagogues'],
    queryFn: async () => {
      const { data } = await api.get('/pedagogos')
      return pedagogueSchema.parse(data)
    },
  })
}