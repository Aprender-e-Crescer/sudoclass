import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

interface UpdateSubjectInput {
  idCourse: string
  idClass: string
  onSuccess: () => void
  onError: (error: Error) => void
}

interface UpdateSubjectData {
  id: string
  name: string
  color: string
  workload: number
}

export function useUpdateSubjectMutation({ idCourse, idClass, onSuccess, onError }: UpdateSubjectInput) {
  return useMutation({
    mutationKey: ['update-subject'],
    mutationFn: async ({ id, name, color, workload }: UpdateSubjectData) => {
      const subjectRef = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', id)
      return await updateDoc(subjectRef, { name, color, workload })
    },
    onSuccess,
    onError,
  })
}
