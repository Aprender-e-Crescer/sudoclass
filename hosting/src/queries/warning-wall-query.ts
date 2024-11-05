import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { Warning, warningSchema } from '@/models/warning-schema'
import SchoolMatrices from '@/routes/school-matrices'

export const WARNINGS_WALL_QUERY_KEY = ['getWarnings']

export function useWarningWallQuery(schoolMatriceId: string) {
  return useQuery({
    queryKey: WARNINGS_WALL_QUERY_KEY,
    queryFn: () => {
      const warningRef = collection(firestore, 'schoolMatrices', schoolMatriceId, 'warning').withConverter({
        toFirestore: (warning: Warning) => warning,
        fromFirestore: (snapshot) => warningSchema.parse(snapshot.data()),
      })

      return getDocs(warningRef).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })
}
