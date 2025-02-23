import { changePasswordRequestSchema, ChangeRequests } from '@/models/change-password-request-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, query } from 'firebase/firestore'

export const getPasswordRequestsFirestoreQuery = () => {
  const passwordRequestsRef = collection(firestore, 'requestsChangePassword').withConverter({
    toFirestore: (request: ChangeRequests) => request,
    fromFirestore: (snapshot) => changePasswordRequestSchema.parse({ id: snapshot.id, ...snapshot.data() }),
  })
  return query(passwordRequestsRef)
}

export const getPasswordRequestsQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-password-requests'],
    queryFn: async () => {
      const querySnapshot = await getDocs(getPasswordRequestsFirestoreQuery())
      return querySnapshot.docs.map((doc) => changePasswordRequestSchema.parse({ id: doc.id, ...doc.data() }))
    },
  })
}
