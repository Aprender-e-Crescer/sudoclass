import { activitySchema } from '@/models/activity-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useActivityQuery(idActivity: number) {
  return useQuery({
    queryKey: ['getActivity', idActivity],
    queryFn: async () => {
      const { data } = await api.get(`/activity/${idActivity}`)
      const activity = activitySchema.parse(data)

      return activity
    },
  })
}
