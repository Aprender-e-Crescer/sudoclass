import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

type Syllabus = {
  description: string
}
export function useSyllabusQuery() {
  return useQuery({
    queryKey: ['syllabus'],
    queryFn: async () => {
      const syllabusRef = collection(firestore, 'syllabus').withConverter({
        toFirestore: (doc: Syllabus) => doc,
        fromFirestore: (snapshot) => snapshot.data() as Syllabus,
      })
      const docSnap = await getDocs(syllabusRef)
      return docSnap.docs.map((doc) => doc.data())
    },
  })
}
