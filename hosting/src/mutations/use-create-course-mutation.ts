import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

interface CreateCourse {
  name: string
  color: string
}

interface CreateCourseInput {
  onError: (error: Error) => void
  onSuccess: (data: { id: string }) => void
}

export function useCreateCourseMutation({ onError, onSuccess }: CreateCourseInput) {
  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: async ({ name, color }: CreateCourse) => {
      const courseRef = collection(firestore, 'courses')
      const docRef = await addDoc(courseRef, { name, color })
      return { id: docRef.id }
    },
    onError,
    onSuccess: (data) => {
      onSuccess(data)
    },
  })
}
