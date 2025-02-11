import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

interface CreateSubjectInput {
  idCourse: string
  idClass: string
  onSuccess: (data: { id: string }) => void
  onError: (error: Error) => void
}

interface CreateSubjectData {
  name: string
  color: string
  workload: number
}

export function useCreateSubjectMutation({ idCourse, idClass, onSuccess, onError }: CreateSubjectInput) {
  return useMutation({
    mutationKey: ['create-subject'],
    mutationFn: async ({ name, color, workload }: CreateSubjectData) => {
      const subjectsRef = collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects')
      const convertedData = {
        name,
        color,
        workload: Number(workload),
      }
      const docRef = await addDoc(subjectsRef, convertedData)
      return { id: docRef.id }
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
    onError,
  })
}
