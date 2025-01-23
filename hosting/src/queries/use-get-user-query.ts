import { userSchema } from '@/models/user-schema'
import { firestore } from '@/services/firebase'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getUserQueryOptions = (uid: string | undefined) => queryOptions({
  queryKey: ['get-user', uid],
  queryFn: async () => {
    const userRef = doc(firestore, 'users', uid!)
    const userDoc = await getDoc(userRef)
    const data = userDoc.data()
    const user = userSchema.parse(data)

    return user
  },
  enabled: !!uid,
})

export function useGetUserQuery(uid: string | undefined) {
  return useQuery(getUserQueryOptions(uid))
}
