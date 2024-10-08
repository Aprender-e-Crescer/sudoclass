import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { responsiblesSchema } from '@/models/list-responsible-schema'

export function useListResponsibleQuery() {
  return useQuery({
    queryKey: ['getResponsibles'],
    queryFn: async () => {
      const responsiblesRef = collection(firestore, 'resposibles')
      const snapshot = await getDocs(responsiblesRef)
      const responsiblesData = snapshot.docs.map((doc) => doc.data())

      const parsedData = responsiblesSchema.safeParse(responsiblesData)

      if (!parsedData.success) {
        throw new Error('Invalid data structure')
      }

      return parsedData.data
    },
  })
}
