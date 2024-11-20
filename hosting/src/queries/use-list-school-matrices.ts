import { firestore } from '@/services/firebase'
import { Matrice, matriceSchema } from '@/models/matrice-schema'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const LIST_SCHOOL_MATRICES_QUERY_KEY = ['getMatrices']

export function useListSchoolMatricesQuery() {
  return useQuery({
    queryKey: LIST_SCHOOL_MATRICES_QUERY_KEY,
    queryFn: async () => {
      const matricesRef = collection(firestore, 'schoolMatrices').withConverter({
        toFirestore: (matrice: Matrice) => matrice,
        fromFirestore: (snapshot) => matriceSchema.parse(snapshot.data()),
      })
      const snapshot = await getDocs(matricesRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
