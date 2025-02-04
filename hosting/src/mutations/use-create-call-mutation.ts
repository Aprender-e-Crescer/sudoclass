import { useMutation } from '@tanstack/react-query'
import { DocumentData, DocumentReference, writeBatch } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { doc } from 'firebase/firestore'

interface CreateSchoolCallMutationInput {
  idCourse: string
  idClass: string
  idSubject: string
  idLessonPlan: string
  profileRefs: DocumentReference<DocumentData, DocumentData>[]
}

export function useCreateSchoolCallMutation() {
  return useMutation({
    mutationKey: ['create-school-call'],
    mutationFn: async ({ idClass, idCourse, idLessonPlan, idSubject, profileRefs }: CreateSchoolCallMutationInput) => {
      const batch = profileRefs.reduce((batch, profileRef) => {
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
        
        return batch
      }, writeBatch(firestore))
      

      await batch.commit()
    },
    onError: (error) => {
      throw new Error(error.message)
    },
  })
}
