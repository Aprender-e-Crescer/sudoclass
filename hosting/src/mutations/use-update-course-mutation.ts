import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateCourseMutation {
  id: string
  name: string
  color: string
}

export function useUpdateCourseMutation() {
  return useMutation({
    mutationKey: ['updateCourse'],
    mutationFn: async ({ id, name, color }: UpdateCourseMutation) => {
      const courseRef = doc(firestore, 'courses', id)
      await updateDoc(courseRef, { name, color })
    },
  })
}
