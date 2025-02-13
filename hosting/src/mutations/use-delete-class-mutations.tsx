import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'

interface DeleteClassInput {
  onSuccess: () => void
  onError: (error: Error) => void
}

interface DeleteClassData {
  idCourse: string
  idClass: string
}

export function useDeleteClassMutation({ onSuccess, onError }: DeleteClassInput) {
  return useMutation({
    mutationKey: ['delete-class'],
    mutationFn: ({ idCourse, idClass }: DeleteClassData) => {
      const classRef = doc(firestore, 'courses', idCourse, 'classes', idClass)
      return deleteDoc(classRef)
    },
    onSuccess,
    onError,
  })
}
