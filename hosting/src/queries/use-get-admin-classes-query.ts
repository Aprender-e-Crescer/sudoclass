import { classSchema, Class } from '@/models/class-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const getAdminsClassesFirestoreQuery = (idCourse: string) => {
  return collection(firestore, 'courses', idCourse, 'classes').withConverter({
    fromFirestore: (snapshot) => classSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (classItem: Class) => classItem,
  })
}

export const getAdminsClassesQueryOptions = (idCourse: string) => {
  return queryOptions({
    queryKey: ['get-admins-classes', idCourse],
    queryFn: async () => getDocs(getAdminsClassesFirestoreQuery(idCourse)),
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
}
