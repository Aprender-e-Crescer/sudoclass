import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'

interface DeleteSubjectInput {
  idCourse: string
  idClass: string
  onSuccess: () => void
  onError: (error: Error) => void
}
export function useDeleteSubjectMutation({ idCourse, idClass, onSuccess, onError }: DeleteSubjectInput) {
  return useMutation({
    mutationKey: ['delete-subject'],
    mutationFn: async (id: string) => {
      const subjectRef = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', id)
      return await deleteDoc(subjectRef)
    },
    onSuccess,
    onError,
  })
}
