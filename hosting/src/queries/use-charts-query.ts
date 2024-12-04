import { useQuery } from '@tanstack/react-query'
import { chartsSchema } from '@/models/chart-schema'
import { api } from '@/services/api'
import { z } from 'zod'

export function useChartsQuery(idClass: string) {
  return useQuery({
    queryKey: ['getCharts', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/nota/${idClass}`)
      const chartData = z.array(chartsSchema).parse(data)

      return chartData
    },
  })
}
