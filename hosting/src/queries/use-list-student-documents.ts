import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { documentSchema, Document } from '@/models/student-document-schema'

export const LIST_STUDENT_DOCUMENTS_QUERY_KEY = ['getDocuments']

export function useListStudentDocumentsQuery() {
  return useQuery({
    queryKey: LIST_STUDENT_DOCUMENTS_QUERY_KEY,
    queryFn: async () => {
      const documentsRef = collection(firestore, 'documents').withConverter({
        toFirestore: (document: Document) => document,
        fromFirestore: (snapshot) => documentSchema.parse(snapshot.data()),
      })

      const snapshot = await getDocs(documentsRef)
      const documents = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const documentData = doc.data()
          const createdByDoc = await getDoc(documentData.createdby)
          const createdByData = createdByDoc.exists() ? createdByDoc.data() : { cpf: '', nome: 'Desconhecido' }

          return {
            ...documentData,
            createdby: createdByData,
          }
        }),
      )

      return documents
    },
  })
}
