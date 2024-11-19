import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useState } from 'react'

export const useCreateCommentMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createComment = async (activityID: string, commentData: { message: string; sentBy: string }) => {
    setLoading(true)
    setError(null)
    try {
      const commentsRef = collection(firestore, 'activities', activityID, 'comments')
      await addDoc(commentsRef, {
        ...commentData,
        timestamp: Timestamp.now(), // Adiciona um timestamp ao comentário
      })
    } catch (err) {
      setError('Erro ao criar comentário.')
    } finally {
      setLoading(false)
    }
  }

  return { createComment, loading, error }
}
