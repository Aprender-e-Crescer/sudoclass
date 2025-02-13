import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, DocumentData, DocumentReference } from 'firebase/firestore'

interface AddPasswordRequestInput {
  onError: (error: Error) => void
  onSuccess: () => void
}
interface AddPasswordRequestData {
  profileRef: DocumentReference<DocumentData, DocumentData>
  password: string
}
export function useAddPasswordRequestMutation({ onError, onSuccess }: AddPasswordRequestInput) {
  return useMutation({
    mutationKey: ['addPasswordRequest'],
    mutationFn: async ({ profileRef, password }: AddPasswordRequestData) => {
      const passwordRequestRef = collection(firestore, 'requestsChangePassword')
      const passwordRequestId = (await addDoc(passwordRequestRef, { profileRef: profileRef })).id
      const credentialRef = collection(firestore, 'requestsChangePassword', passwordRequestId, 'credential')
      const credentialId = (await addDoc(credentialRef, { password })).id
      return { id: credentialId }
    },
    onError,
    onSuccess,
  })
}
