import { warningSchema } from '@/models/warning-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const WARNING_WALL_QUERY = ['getWarnings']

export function useListWarningsQuery() {
  return useQuery({
    queryKey: WARNING_WALL_QUERY,
    queryFn: async () => {
      const { data } = await api.get('/warnings')
      const warnings = z.array(warningSchema).parse(data)

      return warnings
    },
  })
}
