import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'

interface DeletePasswordRequestInput {
  onError: (error: Error) => void
  onSuccess: () => void
}

export function useDeletePasswordRequest({ onError, onSuccess }: DeletePasswordRequestInput) {
  return useMutation({
    mutationKey: ['delete-password-request'],
    mutationFn: (idPasswordRequest: string) => {
      const passwordRequestRef = doc(firestore, 'requestsChangePassword', idPasswordRequest)
      return deleteDoc(passwordRequestRef)
    },
    onError,
    onSuccess,
  })
}
