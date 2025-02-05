import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateCourseMutation {
  name: string
  color: string
}
export function useUpdateCourseMutation(idCourse: string) {
  return useMutation({
    mutationKey: ['updateCourse'],
    mutationFn: async ({ name, color }: UpdateCourseMutation) => {
      const courseRef = doc(firestore, 'courses', idCourse)
      await updateDoc(courseRef, { name, color })
    },
  })
}
