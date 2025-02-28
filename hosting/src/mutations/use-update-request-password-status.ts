import { useMutation } from '@tanstack/react-query'
import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore'

interface UpdateRequestPasswordStatusData {
  passwordChangeRequestRef: DocumentReference<DocumentData, DocumentData>
  status: string
}

export function useUpdateRequestPasswordStatus() {
  return useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: ({ passwordChangeRequestRef, status }: UpdateRequestPasswordStatusData) => updateDoc(passwordChangeRequestRef, { requestStatus: status }),
  })
}
