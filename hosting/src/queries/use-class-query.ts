import { Class, classSchema } from '@/models/class-schema'
import { firestore } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { queryOptions } from "@tanstack/react-query"

export const getClassFirestoreQuery = (idCourse: string, idClass: string) => doc(firestore, 'courses', idCourse, 'classes', idClass).withConverter({
    toFirestore: (data: Class) => data,
    fromFirestore: (snapshot) => classSchema.parse({ id: snapshot.id, ...snapshot.data() }),
})

export const getClassQueryOptions = (idCourse: string, idClass: string) => queryOptions({
    queryKey: ['get-class', idCourse, idClass],
    queryFn: () => getDoc(getClassFirestoreQuery(idCourse, idClass)),
    select: (snapshot) => {
      if (!snapshot.exists()) throw new Error('Class not found')

      return snapshot.data()
    }
})