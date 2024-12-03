import { activitySchema } from '@/models/activity-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const LIST_ACTIVITIES_QUERY = ['getActivies']
export function useListActivitiesQuery(subjectId: number) {
  return useQuery({
    queryKey: [...LIST_ACTIVITIES_QUERY, subjectId],
    queryFn: async () => {
      const { data } = await api.get(`/activities/${subjectId}`)
      console.log('atividades_data:', data)
      const activities = z.array(activitySchema).parse(data)
      console.log('atividades:', activities)

      return activities
    },
  })
}
