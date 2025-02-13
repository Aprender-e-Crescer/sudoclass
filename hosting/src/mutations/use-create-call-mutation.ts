import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, DocumentData, DocumentReference, writeBatch } from 'firebase/firestore'

interface CreateSchoolCallMutationInput {
  idCourse: string
  idClass: string
  idSubject: string
  idsLessonPlan: string[]
  profileRefs: DocumentReference<DocumentData, DocumentData>[]
}

export function useCreateSchoolCallMutation() {
  return useMutation({
    mutationKey: ['create-school-call'],
    mutationFn: async ({ idClass, idCourse, idsLessonPlan, idSubject, profileRefs }: CreateSchoolCallMutationInput) => {
      const batch = writeBatch(firestore)

      profileRefs.forEach((profileRef) => {
        idsLessonPlan.forEach((idLessonPlan) => {
          const missingDocRef = doc(
            firestore,
            'courses',
            idCourse,
            'classes',
            idClass,
            'subjects',
            idSubject,
            'lessonPlannings',
            idLessonPlan,
            'missings',
            profileRef.id,
          )
          batch.set(missingDocRef, { studentProfile: profileRef })
        })
      })

      idsLessonPlan.forEach((idLessonPlan) => {
        const lessonPlanRef = doc(
          firestore,
          'courses',
          idCourse,
          'classes',
          idClass,
          'subjects',
          idSubject,
          'lessonPlannings',
          idLessonPlan,
        )
        batch.update(lessonPlanRef, { isCallMade: true })
      })

      await batch.commit()
    },
  })
}
