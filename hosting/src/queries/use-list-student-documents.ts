import { documentSchema } from '@/models/student-document-schema'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const LIST_STUDENT_DOCUMENTS_QUERY_KEY = ['getStudentDocuments']

export function useListStudentDocumentsQuery(id: number | null | undefined) {
  return useQuery({
    queryKey: LIST_STUDENT_DOCUMENTS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get(`/alunos/documents/${id}`)
      const documents = z.array(documentSchema).parse(data)
      return documents
    },
  })
}
