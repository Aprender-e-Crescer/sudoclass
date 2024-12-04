import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useGetNoteByActivity(activityId: number, studentId: number) {
  return useQuery({
    queryKey: ['getNoteByActivity', activityId, studentId],
    queryFn: async () => {
      try {
        const note = await api.get(`/note/activity/${activityId}/student/${studentId}`)
        if (note && note.data) {
          return note.data
        } else {
          console.error('A resposta não contém dados válidos:', note)
        }
      } catch (error) {
        console.error('Erro ao buscar as notas:', error)
      }
    },
    enabled: Boolean(activityId && studentId),
  })
}
