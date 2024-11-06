import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { Warning, warningSchema } from '@/models/warning-schema'

export const WARNINGS_WALL_QUERY_KEY = (schoolMatriceId: string, subjectId: string) => [
  'getWarnings',
  schoolMatriceId,
  subjectId,
]

export function useWarningWallQuery(schoolMatriceId: string, subjectId: string) {
  return useQuery({
    queryKey: WARNINGS_WALL_QUERY_KEY(schoolMatriceId, subjectId),
    queryFn: () => {
      const warningRef = collection(
        firestore,
        'schoolMatrices',
        schoolMatriceId,
        'subjects',
        subjectId,
        'warning',
      ).withConverter({
        toFirestore: (warning: Warning) => warning,
        fromFirestore: (snapshot) => warningSchema.parse(snapshot.data()),
      })

      return getDocs(warningRef).then(({ docs }) => docs.map((doc) => doc.data()))
    },
  })
}
