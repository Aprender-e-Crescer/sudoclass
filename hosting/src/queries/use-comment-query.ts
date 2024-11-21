import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useState, useEffect } from 'react'

interface Comment {
  id: string
  message: string
  sentBy: string
  timestamp: Date
}

export const useCommentsQuery = (activityID: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    setLoading(true)
    try {
      const commentsRef = collection(firestore, 'activities', activityID, 'comments')
      const querySnapshot = await getDocs(query(commentsRef, orderBy('timestamp', 'asc')))
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[]

      setComments(commentsData)
    } catch (err) {
      console.error('Erro ao buscar comentários:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [activityID])

  return { comments, loading, fetchComments }
}
