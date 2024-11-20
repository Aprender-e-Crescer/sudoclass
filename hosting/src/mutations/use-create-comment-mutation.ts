import { firestore } from '@/services/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'

export function useCreateCommentMutation(courseID: string, classID: string, subjectID: string, activityID: string) {
  return useMutation({
    mutationKey: ['createComment', courseID, classID, subjectID, activityID],
    mutationFn: (commentData: { message: string; sentBy: string }) =>
      addDoc(
        collection(
          firestore,
          'courses',
          courseID,
          'classes',
          classID,
          'subjects',
          subjectID,
          'activities',
          activityID,
          'comments',
        ),
        {
          ...commentData,
          timestamp: Timestamp.now(), // Adiciona o timestamp ao comentário
        },
      ),
  })
}
