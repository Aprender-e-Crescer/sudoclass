import { User, userSchema } from '@/models/user-schema'
import { firestore } from '@/services/firebase'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getUserQueryOptions = (uid: string | undefined) => queryOptions({
  queryKey: ['get-user', uid],
  queryFn: async () => {
    if (!uid) throw new Error('uid is required')
    
    const userRef = doc(firestore, 'users', uid).withConverter({
      toFirestore: (snapshot: User) => snapshot,
      fromFirestore: (snapshot, options) => userSchema.parse(snapshot.data(options)),
    })
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) throw new Error('User not found')
    
    const data = userDoc.data()
    return data
  },
  enabled: !!uid,
})

export function useGetUserQuery(uid: string | undefined) {
  return useSuspenseQuery(getUserQueryOptions(uid))
}
