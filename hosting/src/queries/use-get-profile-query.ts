import { Profile, profileSchema } from '@/models/profile-schema'
import { queryOptions } from '@tanstack/react-query'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export const getProfileFirestoreQuery = (profileRef: DocumentReference<DocumentData, DocumentData>) =>
  profileRef.withConverter({
    fromFirestore: (snapshot) => profileSchema.parse({ id: snapshot.id, profileRef, ...snapshot.data() }),
    toFirestore: (profile: Profile) => profile,
  })

export const getProfileQueryOptions = (profileRef: DocumentReference<DocumentData, DocumentData>) =>
  queryOptions({
    queryKey: ['get-profile', profileRef],
    queryFn: () => getDoc(getProfileFirestoreQuery(profileRef)),
    select: (snapshot) => snapshot.data(),
  })
