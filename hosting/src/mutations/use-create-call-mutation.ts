import { MISSINGS_QUERY_KEY } from '@/queries/use-get-missings-query'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection, DocumentData, DocumentReference } from 'firebase/firestore'

interface CreateSchoolCallMutation {
  studentProfileRef: DocumentReference<DocumentData, DocumentData> | undefined
}

export function useCreateSchoolCallMutation(
  courseId: string,
  classId: string,
  subjectId: string,
  lessonPlanId: string,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createSchoolCall'],
    mutationFn: async (studentProfile: CreateSchoolCallMutation) => {
      const missingRef = collection(
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
      )
      const newMissing = await addDoc(missingRef, { studentProfile: studentProfile.studentProfileRef })
      return newMissing.id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MISSINGS_QUERY_KEY })
    },
  })
}
