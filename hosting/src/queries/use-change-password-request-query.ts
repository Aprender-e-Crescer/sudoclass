import { firestore } from '@/services/firebase'
import { changePasswordRequestSchema, ChangeRequests } from '@/models/change-password-request-schema'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'


export const LIST_CHANGE_PASSWORD_REQUESTS_QUERY_KEY = ['changed-password-requests']

export function useChangePasswordRequestQuery() {
  return useQuery({
    queryKey: LIST_CHANGE_PASSWORD_REQUESTS_QUERY_KEY,
    queryFn: async () => {
      const passwordRequestsRef = collection(firestore, 'studentPasswordChangeRequests').withConverter({
        toFirestore: (doc: ChangeRequests) => doc,
        fromFirestore: (snapshot) => changePasswordRequestSchema.parse(snapshot.data()),
      })

      const docSnap = await getDocs(passwordRequestsRef)
      return docSnap.docs.map((doc) => doc.data())
    },
  })
}
