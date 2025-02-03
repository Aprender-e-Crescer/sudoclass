import { Profile, profileSchema } from '@/models/profile-schema'
import { firestore } from '@/services/firebase'
import { queryOptions, useSuspenseQueries } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { useFirestoreRealtimeQueries } from '@/hooks/use-firestore-realtime-queries'

const q = (profileId: string) =>
  doc(firestore, 'profile', profileId).withConverter({
    fromFirestore: snapshot =>
      profileSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (profile: Profile) => profile,
  })

export const getProfileQueryOptions = (profileId: string) =>
  queryOptions({
    queryKey: ['get-profile', profileId],
    queryFn: async () => getDoc(q(profileId)),
    select: (documentSnapshot) => {
        if (!documentSnapshot.exists()) {
            throw new Error('Profile not found')
        }

        return documentSnapshot.data()
    }
  })

export const getProfileQueriesOptions = (sentByProfileIds: string[]) => sentByProfileIds?.map((sentByProfileId) => {
    const options = getProfileQueryOptions(sentByProfileId)
    
    return options
  })

export function useSentByProfilesQueries(sentByProfileIds: string[]) {
    const queries = getProfileQueriesOptions(sentByProfileIds)
    
    useFirestoreRealtimeQueries(queries.map(({ queryKey }) => ({ queryKey, q: q(queryKey[1]) })))

    return useSuspenseQueries({ queries })
}
