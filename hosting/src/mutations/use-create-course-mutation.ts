import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

interface CreateCourse {
  name: string
  color: string
}

export function useCreateCourseMutation() {
  return useMutation({
    mutationKey: ['createCourse'],
    mutationFn: ({ name, color }: CreateCourse) => {
      const courseRef = collection(firestore, 'courses')
      return addDoc(courseRef, { name, color })
    },
    onError: (err) => console.error(err),
  })
}
