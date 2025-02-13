import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, DocumentData, DocumentReference } from 'firebase/firestore'

interface AddPasswordRequestInput {
  onError: (error: Error) => void
  onSuccess: () => void
}
interface AddPasswordRequestData {
  profileRef: DocumentReference<DocumentData, DocumentData>
}
export function useAddPasswordRequestMutation({ onError, onSuccess }: AddPasswordRequestInput) {
  return useMutation({
    mutationKey: ['addPasswordRequest'],
    mutationFn: ({ profileRef }: AddPasswordRequestData) => {
      const passwordRequestRef = collection(firestore, 'requestsChangePassword')
      return addDoc(passwordRequestRef, { profileRef: profileRef })
    },
    onError,
    onSuccess,
  })
}
