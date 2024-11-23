import { activitySchema } from '@/models/activity-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export function useListActivitiesQuery() {
  return useQuery({
    queryKey: ['getActivies'],
    queryFn: async () => {
      const { data } = await api.get('/activities')
      const activities = z.array(activitySchema).parse(data)

      return activities
    },
  })
}
