
import { useFirestoreRealtimeQuery } from '@/hooks/useFirestoreRealtimeQuery'
import { Warning, warningsSchema } from '@/models/warning-schema'
import { firestore } from '@/services/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export function useGetWarningsQuery(idCourse: string, idClass: string, idSubject: string) {
  const warningsRef = collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'warnings').withConverter({
    fromFirestore: snapshot => warningsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (warning: Warning) => warning
  })

  const q = query(warningsRef, orderBy('sentDate', 'desc'))

  return useFirestoreRealtimeQuery({
    queryKey: ['get-warnings'],
    queryFn: async () => {
      const querySnapshot = await getDocs(q)
      
      const warnings = querySnapshot.docs.map(doc => doc.data())

      return warnings
    },
  }, q)
}
