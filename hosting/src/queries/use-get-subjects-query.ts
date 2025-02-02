import { Subject, subjectsSchema } from '@/models/subjects-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const getSubjectsFirestoreQuery = (idCourse: string, idClass: string) => collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects').withConverter({
  fromFirestore: snapshot => subjectsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
  toFirestore: (subject: Subject) => subject
})

export const getSubjectsQueryOptions = (idCourse: string, idClass: string) => queryOptions({
  queryKey: ['get-subjects', idCourse, idClass],
  queryFn: async () => getDocs(getSubjectsFirestoreQuery(idCourse, idClass)),
  select: (snapshot) => snapshot.docs.map(doc => doc.data())
})
