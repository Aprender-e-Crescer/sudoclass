import { Missing, missingSchema } from '@/models/missing-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export const MISSINGS_QUERY_KEY = ['get-missings']

export const getMissinsFirestoreQuery = (courseId: string, classId: string, subjectId: string, lessonPlanId: string) =>
  collection(
    firestore,
    'courses',
    courseId,
    'classes',
    classId,
    'subjects',
    subjectId,
    'lessonPlannings',
    lessonPlanId,
    'missings',
  ).withConverter({
    toFirestore: (missing: Missing) => missing,
    fromFirestore: (snapshot) => missingSchema.parse({ id: snapshot.id, ...snapshot.data() }),
  })

export const getMissingsQueryOptions = (courseId: string, classId: string, subjectId: string, lessonPlanId: string) =>
  queryOptions({
    queryKey: ['get-missings'],
    queryFn: () => getDocs(getMissinsFirestoreQuery(courseId, classId, subjectId, lessonPlanId)),
    select: (snapshot) => snapshot.docs.map((doc) => missingSchema.parse({ id: doc.id, ...doc.data() })),
  })
