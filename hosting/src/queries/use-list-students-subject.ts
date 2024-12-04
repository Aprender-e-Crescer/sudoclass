import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const STUDENT_LIST_BY_SUBJECT_QUERY = ['studentListBySubject']

export function useStudentListBySubjectQuery(subjectId: number) {
  return useQuery({
    queryKey: STUDENT_LIST_BY_SUBJECT_QUERY,
    queryFn: async () => {
      const response = await api.get(`/subject/studentlistbysubject/${subjectId}`)
      return response.data
    },
    enabled: !!subjectId,
  })
}
