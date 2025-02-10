import { Profile, profileSchema } from '@/models/profile-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

const q = (profileId: string) =>
  doc(firestore, 'profiles', profileId).withConverter({
    fromFirestore: (snapshot) => profileSchema.parse({ id: snapshot.id, profileRef: snapshot.ref, ...snapshot.data() }),
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
    },
  })

export const getProfileQueriesOptions = (sentByProfileIds: string[]) =>
  sentByProfileIds?.map((sentByProfileId) => {
    const options = getProfileQueryOptions(sentByProfileId)

    return options
  })
