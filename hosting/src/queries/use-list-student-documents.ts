import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { documentSchema } from '@/models/student-document-schema'
import { api } from '@/services/api'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'

export const LIST_STUDENT_DOCUMENTS_QUERY_KEY = ['getStudentDocuments']

export function useListStudentDocumentsQuery(id: number | null | undefined) {
  return useQuery({
    queryKey: [LIST_STUDENT_DOCUMENTS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/documents/${id}`)
      const documents = z.array(documentSchema).parse(data)

      const documentsWithUrls = await Promise.all(
        documents.map(async (doc) => {
          try {
            const documentRef = ref(storage, `users/${id}/documents/${doc.id_documentoalunos}/${doc.nome + '.pdf'}`)
            const url = await getDownloadURL(documentRef)

            return { ...doc, url }
          } catch (error) {
            if (error.code === 'storage/object-not-found') {
              console.warn(`Documento não encontrado: ${doc.nome}`)
              return { ...doc, url: null }
            }
            throw error
          }
        }),
      )

      return documentsWithUrls
    },
  })
}
