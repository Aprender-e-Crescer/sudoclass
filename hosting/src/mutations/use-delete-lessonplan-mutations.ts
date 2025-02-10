import { useMutation } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

interface DeleteLessonPlanMutationInput {
  idCourse: string
  idClass: string
  idSubject: string
  idLessonPlan: string
}

export function useDeleteLessonPlanMutation() {
  return useMutation({
    mutationKey: ['delete-lesson-plan'],
    mutationFn: async ({ idClass, idCourse, idLessonPlan, idSubject }: DeleteLessonPlanMutationInput) => {
      const lessonPlanRef = doc(
        firestore,
        'courses', idCourse,
        'classes', idClass,
        'subjects', idSubject,
        'lessonPlannings', idLessonPlan
      )
      await deleteDoc(lessonPlanRef) 
    },
  })
}
