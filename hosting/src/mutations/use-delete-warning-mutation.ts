import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export function useDeleteWarningMutation(idCourse: string, idClass: string, idSubject: string) {
  return useMutation({
    mutationFn: async (id: string) => {
      const warningRef = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'warnings', id)

      await deleteDoc(warningRef)
    },
  })
}
