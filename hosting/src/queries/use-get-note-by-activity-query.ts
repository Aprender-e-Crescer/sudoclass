import { Submit, submitsSchema } from '@/models/submits-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, query, where, getDocs, DocumentData, DocumentReference } from 'firebase/firestore'

export const getNoteByActivityFirestoreQuery = (
  idCourse: string,
  idClass: string,
  idSubject: string,
  idActivity: string,
  profileRef: DocumentReference<DocumentData, DocumentData>,
) => {
  return query(
    collection(
      firestore,
      'courses',
      idCourse,
      'classes',
      idClass,
      'subjects',
      idSubject,
      'activities',
      idActivity,
      'submits',
    ),
    where('studentProfile', '==', profileRef),
  ).withConverter({
    fromFirestore: (snapshot) => submitsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (note: Submit) => note,
  })
}

export const getNoteByActivityQueryOptions = (
  idCourse: string,
  idClass: string,
  idSubject: string,
  idActivity: string,
  profileRef: DocumentReference<DocumentData, DocumentData>,
) => {
  return queryOptions({
    queryKey: ['get-note', idCourse, idClass, idSubject, idActivity, profileRef],
    queryFn: async () => {
      const snapshot = await getDocs(
        getNoteByActivityFirestoreQuery(idCourse, idClass, idSubject, idActivity, profileRef),
      )
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
