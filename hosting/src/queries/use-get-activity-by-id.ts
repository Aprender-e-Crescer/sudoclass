import { Activity, activitySchema } from '@/models/activity-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getActivityByIdFirestoreQuery = (
  idCourse: string,
  idClass: string,
  idSubject: string,
  idActivity: string,
) =>
  doc(
    firestore,
    'courses',
    idCourse,
    'classes',
    idClass,
    'subjects',
    idSubject,
    'activities',
    idActivity,
  ).withConverter({
    fromFirestore: (snapshot) => activitySchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (activity: Activity) => activity,
  })

export const getActivityByIdQueryOptions = (idCourse: string, idClass: string, idSubject: string, idActivity: string) =>
  queryOptions({
    queryKey: ['get-activity-by-id', idCourse, idClass, idSubject, idActivity],
    queryFn: async () => {
      const docSnapshot = await getDoc(getActivityByIdFirestoreQuery(idCourse, idClass, idSubject, idActivity))
      console.log(docSnapshot)
      if (!docSnapshot.exists()) {
        throw new Error('Activity not found')
      }
      return docSnapshot.data()
    },
    select: (data) => data,
  })
