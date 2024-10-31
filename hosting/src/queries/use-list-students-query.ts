import { Activity, activitySchema } from '@/models/activity-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function useListSubjectsQuery() {
  return useQuery({
    queryKey: ['getActivies'],
    queryFn: async () => {
      const studentsRef = collection(firestore, 'activities').withConverter({
        toFirestore: (activity: Activity) => activity,
        fromFirestore: (snapshot) => activitySchema.parse(snapshot.data()),
      })
      const snapshot = await getDocs(studentsRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
