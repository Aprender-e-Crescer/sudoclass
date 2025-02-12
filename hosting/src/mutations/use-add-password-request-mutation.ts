import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, DocumentData, DocumentReference } from 'firebase/firestore'

interface AddPasswordRequestData {
  profileRef: DocumentReference<DocumentData, DocumentData>
}
export function useAddPasswordRequestMutation() {
  return useMutation({
    mutationKey: ['addPasswordRequest'],
    mutationFn: ({ profileRef }: AddPasswordRequestData) => {
      const passwordRequestRef = collection(firestore, 'requestsChangePassword')
      return addDoc(passwordRequestRef, profileRef)
    },
  })
}
