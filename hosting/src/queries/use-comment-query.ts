import { Comment, commentSchema } from '@/models/comment-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

interface ListCommentsQueryProps {
  schoolMatriceId: string
  subjectId: string
  activityId: string
  correctionId: string
}

export function useListCommentsQuery({ schoolMatriceId, subjectId, activityId, correctionId }: ListCommentsQueryProps) {
  return useQuery<Comment[]>({
    queryKey: ['getComments', schoolMatriceId, subjectId, activityId, correctionId],
    queryFn: async () => {
      const commentsRef = collection(
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
      ).withConverter({
        toFirestore: (comment: Comment) => comment,
        fromFirestore: (snapshot) => commentSchema.parse(snapshot.data()),
      })

      const snapshot = await getDocs(commentsRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
