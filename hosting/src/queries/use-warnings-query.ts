
import { Warning, warningsSchema } from '@/models/warning-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getWarningsFirestoreQuery = (idCourse: string, idClass: string, idSubject: string) => query(
  collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'warnings')
    .withConverter({
      fromFirestore: snapshot => warningsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
      toFirestore: (warning: Warning) => warning
    }),
  orderBy('sentDate', 'desc')
) 

export const getWarningsQueryOptions = (idCourse: string, idClass: string, idSubject: string) => queryOptions({
  queryKey: ['get-warnings'],
  queryFn: () => getDocs(getWarningsFirestoreQuery(idCourse, idClass, idSubject)),
  select: (snapshot) => snapshot.docs.map(doc => doc.data())
})

