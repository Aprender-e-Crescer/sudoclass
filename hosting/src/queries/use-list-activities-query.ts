import { Activity, activitySchema } from '@/models/activity-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getActivitiesFirestoreQuery = (idCourse: string, idClass: string, idSubject: string) =>
  query(
    collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'activities').withConverter({
      fromFirestore: (snapshot) => activitySchema.parse({ id: snapshot.id, ...snapshot.data() }),
      toFirestore: (activities: Activity) => activities,
    }),
    orderBy('postingDate', 'desc')
  )

export const getActivitiesQueryOptions = (idCourse: string, idClass: string, idSubject: string) =>
  queryOptions({
    queryKey: ['get-activities'],
    queryFn: async () => {
      const querySnapshot = await getDocs(getActivitiesFirestoreQuery(idCourse, idClass, idSubject))
      return querySnapshot
    },
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
