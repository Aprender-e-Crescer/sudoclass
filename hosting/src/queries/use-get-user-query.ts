import { User, userSchema } from '@/models/user-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getUserFirestoreQuery = (uid: string) => doc(firestore, 'users', uid).withConverter({
  toFirestore: (snapshot: User) => snapshot,
  fromFirestore: (snapshot, options) => userSchema.parse({ ...snapshot.data(options), id: snapshot.id }),
})

export const getUserQueryOptions = (uid: string | undefined) => queryOptions({
  queryKey: ['get-user', uid],
  queryFn: () => getDoc(getUserFirestoreQuery(uid!)),
  enabled: !!uid,
  select: (snapshot) => {
    if (!snapshot.exists()) throw new Error('User not found')
    return snapshot.data()
  }
})
