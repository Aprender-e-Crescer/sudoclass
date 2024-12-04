import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
export const LINK_ACTIVITY_QUERY = ['getLinkFromActivity']
export function useGetLinkFromActivity(activityId: number, studentId: number) {
  return useQuery({
    queryKey: [...LINK_ACTIVITY_QUERY, activityId, studentId],
    queryFn: async () => {
      const link = await api.get(`/activities/${activityId}/student/${studentId}`)

      return link.data
    },
    enabled: Boolean(activityId && studentId),
  })
}
