import { Subject, subjectsSchema } from '@/models/subjects-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function useListSubjectsQuery(schoolMatricesId: string) {
  return useQuery({
    queryKey: ['getSubjects'],
    queryFn: async () => {
      const subjectRefs = collection(firestore, 'schoolMatrices', schoolMatricesId, 'subjects').withConverter({
        toFirestore: (subject: Subject) => subject,
        fromFirestore: (snapshot) => subjectsSchema.parse(snapshot.data()),
      })

      const snapshot = await getDocs(subjectRefs)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
