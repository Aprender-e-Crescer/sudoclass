import { Activity, activitySchema } from '@/models/activity-schema'
import { firestore, storage } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { getBytes, getDownloadURL, listAll, ref } from 'firebase/storage';

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

  export const getActivityByIdQueryOptions = (
    idCourse: string,
    idClass: string,
    idSubject: string,
    idActivity: string,
  ) =>
    queryOptions({
      queryKey: ['get-activity-by-id', idCourse, idClass, idSubject, idActivity],
      queryFn: async () => {
        const docSnapshot = await getDoc(
          getActivityByIdFirestoreQuery(idCourse, idClass, idSubject, idActivity),
        );
  
        if (!docSnapshot.exists()) {
          throw new Error('Activity not found');
        }
  
        const activityData = docSnapshot.data() as Activity;
  
        const attachmentsRefs = await listAll(
          ref(storage, `courses/${idCourse}/classes/${idClass}/subjects/${idSubject}/activities/${idActivity}`),
        );
  
        const attachments = await Promise.all(
          attachmentsRefs.items.map(async (fileRef) => {
            const fileArrayBuffer = await getBytes(fileRef)
  
            return new File([fileArrayBuffer], fileRef.name)
          }),
        )
  
        return {
          ...activityData,
          attachments: attachments
            .filter((file) => file !== null),
        }
      },
      select: (data) => data,
    });