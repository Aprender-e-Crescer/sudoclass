import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'

export function useDeleteCourseMutation() {
  return useMutation({
    mutationKey: ['delete-course'],
    mutationFn: (idCourse: string) => {
      const courseRef = doc(firestore, 'courses', idCourse)
      return deleteDoc(courseRef)
    },
  })
}
