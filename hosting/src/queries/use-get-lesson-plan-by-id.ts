import { LessonPlan, lessonPlanSchema } from '@/models/lesson-plan-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getLessonPlanByIdFirestoreQuery = (
  idCourse: string,
  idClass: string,
  idSubject: string,
  idLessonPlan: string
) => {
  const lessonPlanRef = doc(
    firestore,
    'courses',
    idCourse,
    'classes',
    idClass,
    'subjects',
    idSubject,
    'lessonPlannings',
    idLessonPlan
  )

  return lessonPlanRef.withConverter({
    fromFirestore: snapshot => {
      return lessonPlanSchema.parse({ id: snapshot.id, ...snapshot.data() })
    },
    toFirestore: (lessonPlan: LessonPlan) => lessonPlan,
  })
}

export const getLessonPlanByIdQueryOptions = (
  idCourse: string,
  idClass: string,
  idSubject: string,
  idLessonPlan: string
) => async () => {
  const lessonPlanRef = doc(
    firestore,
    'courses', idCourse,
    'classes', idClass,
    'subjects', idSubject,
    'lessonPlannings', idLessonPlan
  )

  const lessonPlanSnap = await getDoc(lessonPlanRef)

  if (lessonPlanSnap.exists()) {
    return lessonPlanSnap.data() as LessonPlan
  } else {
    throw new Error('Lesson Plan not found')
  }
}

