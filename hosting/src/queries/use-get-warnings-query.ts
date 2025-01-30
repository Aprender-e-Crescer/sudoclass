
import { Warning, warningsSchema } from '@/models/warning-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function useGetWarningsQuery(idCourse: string, idClass: string, idSubject: string) {
  return useQuery({
    queryKey: ['get-warnings'],
    queryFn: async () => {
      const warningsRef = collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'warnings').withConverter({
        fromFirestore: snapshot => warningsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
        toFirestore: (warning: Warning) => warning
      })

      const querySnapshot = await getDocs(warningsRef)
      
      const warnings = querySnapshot.docs.map(doc => doc.data())

      return warnings
    },
  })
}
