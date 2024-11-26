import { warningSchema } from '@/models/warning-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const WARNING_WALL_QUERY = ['getWarnings']
export function useListWarningsQuery(idSubject: string) {
  return useQuery({
    queryKey: [...WARNING_WALL_QUERY, idSubject],
    queryFn: async () => {
      const { data } = await api.get(`/warnings/${idSubject}`)
      const warnings = z.array(warningSchema).parse(data)

      return warnings
    },
  })
}
