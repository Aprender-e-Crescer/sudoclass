import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetLinkFromActivity(activityId: number, studentId: number) {
  return useQuery({
    queryKey: ['getLinkFromActivity', activityId, studentId],
    queryFn: async () => {
      const link = await api.get(`/activities/${activityId}/student/${studentId}`)

      return link.data
    },
    enabled: Boolean(activityId && studentId),
  })
}
