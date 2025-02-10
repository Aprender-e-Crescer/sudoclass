import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, DocumentData, DocumentReference } from 'firebase/firestore'

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
  teacherRef: DocumentReference<DocumentData, DocumentData>[]
}

export function useCreateSubjectMutation({ idCourse, idClass, onSuccess, onError }: CreateSubjectInput) {
  return useMutation({
    mutationKey: ['create-subject'],
    mutationFn: async ({ name, color, workload, teacherRef }: CreateSubjectData) => {
      const subjectsRef = collection(firestore, 'courses', idCourse, 'classes', idClass, 'subjects')
      const docRef = await addDoc(subjectsRef, { name, color, workload, teacherRef })
      return { id: docRef.id }
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
    onError,
  })
}
