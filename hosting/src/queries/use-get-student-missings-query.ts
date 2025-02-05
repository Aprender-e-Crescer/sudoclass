import { Missing, missingSchema } from '@/models/missing-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, DocumentData, DocumentReference, getDocs, query, where } from 'firebase/firestore'

export const MISSINGS_QUERY_KEY = ['get-missings']

export const getStudentMissingsFirestoreQuery = (courseId: string, classId: string, subjectId: string, lessonPlanId: string, studentProfileRef: DocumentReference<DocumentData, DocumentData>) =>
  query(
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
      fromFirestore: (snapshot) => missingSchema.parse({ id: snapshot.id, idLessonPlan: lessonPlanId, ...snapshot.data() }),
    }),
    where('studentProfile', '==', studentProfileRef),
  )

export const getStudentMissingsQueryOptions = (courseId: string, classId: string, subjectId: string, lessonPlanId: string, studentProfileRef: DocumentReference<DocumentData, DocumentData>) =>
  queryOptions({
    queryKey: ['get-student-missings', studentProfileRef.id, courseId, classId, subjectId, lessonPlanId],
    queryFn: () => getDocs(getStudentMissingsFirestoreQuery(courseId, classId, subjectId, lessonPlanId, studentProfileRef)),
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
