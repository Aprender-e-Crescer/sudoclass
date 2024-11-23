import { warningSchema } from '@/models/warning-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useListWarningsQuery() {
  return useQuery({
    queryKey: ['getWarnings'],
    queryFn: async () => {
      const { data } = await api.get('/warnings')
      const warnings = z.array(warningSchema).parse(data)

      return warnings
    },
  })
}
