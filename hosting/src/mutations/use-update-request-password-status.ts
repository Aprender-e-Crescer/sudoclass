import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { collection, doc, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from 'firebase/firestore'

interface UpdateRequestPasswordStatusData {
  profileRef: DocumentReference<DocumentData, DocumentData>
  status: string
}

export function useUpdateRequestPasswordStatus() {
  return useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: async ({ profileRef, status }: UpdateRequestPasswordStatusData) => {
      const requestsChangePasswordRef = collection(firestore, 'requestsChangePassword')
      const q = query(requestsChangePasswordRef, where('profileRef', '==', profileRef))

      const requestSnapshot = await getDocs(q)
      const requestDoc = requestSnapshot.docs[0].id
      const request = doc(requestsChangePasswordRef, requestDoc)

      updateDoc(request, { requestStatus: status })
    },
  })
}
