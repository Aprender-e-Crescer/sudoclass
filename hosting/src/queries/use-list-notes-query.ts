import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const LIST_NOTES_QUERY = ['getNotes']

export function useListNotesQuery(subjectId: number) {
  return useQuery({
    queryKey: LIST_NOTES_QUERY,
    queryFn: async () => {
      const response = await api.get(`/note/students/${subjectId}/average`)
      return response.data
    },
    enabled: !!subjectId,
  })
}
