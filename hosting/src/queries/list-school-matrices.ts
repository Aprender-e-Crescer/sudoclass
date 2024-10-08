import { firestore } from '@/services/firebase'
import { matricesSchema } from '@/models/matriz-schema'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function ListSchoolMatrices() {
  return useQuery({
    queryKey: ['getMatrices'],
    queryFn: async () => {
      const matricesRef = collection(firestore, 'schoolMatrices')
      const snapshot = await getDocs(matricesRef)
      const matricesData = snapshot.docs.map((doc) => doc.data())

      const parsedData = matricesSchema.safeParse(matricesData)

      if (!parsedData.success) {
        throw new Error('Invalid data structure')
      }

      return parsedData.data
    },
  })
}
