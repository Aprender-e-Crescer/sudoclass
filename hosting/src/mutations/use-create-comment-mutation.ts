import { Comment } from '@/models/comment-schema'
import { firestore } from '@/services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

interface UseCreateCommentMutationProps {
  schoolMatriceId: string
  subjectId: string
  activityId: string
  correctionId: string
}

export function useCreateCommentMutation({
  schoolMatriceId,
  subjectId,
  activityId,
  correctionId,
}: UseCreateCommentMutationProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: (comment: Comment) =>
      addDoc(
        collection(
          firestore,
          'schoolMatrices',
          schoolMatriceId,
          'subjects',
          subjectId,
          'activities',
          activityId,
          'correction',
          correctionId,
          'comments',
        ),
        comment,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getComments', schoolMatriceId, subjectId, activityId, correctionId],
      })
    },
  })
}
