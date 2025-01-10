import { userSchema } from '@/models/user-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export function useGetUserQuery(uid: string | undefined) {
  return useQuery({
    queryKey: ['get-user', uid],
    queryFn: async () => {
      const userRef = doc(firestore, 'users', uid!)
      const { data } = await getDoc(userRef)
      const user = userSchema.parse(data)

      return user
    },
    enabled: !!uid,
  })
}
