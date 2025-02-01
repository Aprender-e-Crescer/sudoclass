import { useMutation } from '@tanstack/react-query'
import { firestore } from '@/services/firebase'
import { collection, addDoc, DocumentReference, DocumentData, serverTimestamp } from 'firebase/firestore'

interface CreateWarningData {
  message: string
  idCourse: string
  idClass: string
  idSubject: string
}

interface CreateWarningMutation {
  onSuccess: () => void
  onError: (error: Error) => void
  authorProfileRef: DocumentReference<DocumentData, DocumentData> | undefined
}

export function useCreateWarningMutation({ onSuccess, onError, authorProfileRef }: CreateWarningMutation) {
  return useMutation({
    mutationFn: async (data: CreateWarningData) => {
      const warningsRef = collection(
        firestore,
        'courses',
        data.idCourse,
        'classes',
        data.idClass,
        'subjects',
        data.idSubject,
        'warnings',
      )

      const docRef = await addDoc(warningsRef, {
        message: data.message,
        sentByProfile: authorProfileRef, 
        sentDate: serverTimestamp(),
      })

      return docRef.id
    },
    onSuccess,
    onError,
  })
}
