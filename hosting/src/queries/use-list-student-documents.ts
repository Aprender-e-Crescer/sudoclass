import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, getDoc } from 'firebase/firestore'
import { documentSchema, Document } from '@/models/student-document-schema'

export const LIST_STUDENT_DOCUMENTS_QUERY_KEY = ['getDocuments']

export function useListStudentDocumentsQuery(studentId: string) {
  return useQuery({
    queryKey: [...LIST_STUDENT_DOCUMENTS_QUERY_KEY, studentId],
    queryFn: async () => {
      const documentsRef = collection(firestore, `students/${studentId}/documents`).withConverter({
        toFirestore: (document: Document) => document,
        fromFirestore: (snapshot) => documentSchema.parse(snapshot.data()),
      })

      const snapshot = await getDocs(documentsRef)
      const documents = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const documentData = doc.data()
          const createdByDoc = await getDoc(documentData.createdBy)
          const createdBy = createdByDoc.data()

          return {
            ...documentData,
            createdBy,
          }
        }),
      )

      return documents
    },
  })
}
