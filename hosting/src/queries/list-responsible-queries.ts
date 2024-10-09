import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { Responsible, responsibleSchema } from '@/models/list-responsible-schema'

export function useListResponsibleQuery() {
  return useQuery({
    queryKey: ['getResponsibles'],
    queryFn: async () => {
      const responsiblesRef = collection(firestore, 'resposibles').withConverter({
        toFirestore: (responsible: Responsible) => responsible,
        fromFirestore: (snapshot) => responsibleSchema.parse(snapshot.data()),
      })
      const snapshot = await getDocs(responsiblesRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
