import { Activity, activitySchema } from '@/models/activity-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function useListActivitiesQuery(schoolMatriceId: string, subjectId: string) {
  return useQuery({
    queryKey: ['getActivies', schoolMatriceId, subjectId],
    queryFn: async () => {
      const activiesRef = collection(
        firestore,
        'schoolMatrices',
        schoolMatriceId,
        'subjects',
        subjectId,
        'activities',
      ).withConverter({
        toFirestore: (activity: Activity) => activity,
        fromFirestore: (snapshot) =>
          activitySchema.parse({
            id: snapshot.id,
            ...snapshot.data(),
          }),
      })

      const snapshot = await getDocs(activiesRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
