import { Course, courseSchema } from '@/models/course-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const getAdminCoursesFirestoreQuery = () => {
  return collection(firestore, 'courses').withConverter({
    fromFirestore: (snapshot) => courseSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (course: Course) => course,
  })
}

export const getAdminCoursesQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-admin-courses'],
    queryFn: () => getDocs(getAdminCoursesFirestoreQuery()),
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
}
