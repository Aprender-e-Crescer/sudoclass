import { Profile, profileSchema } from '@/models/profile-schema'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export const getProfileQueryOptions = (profileRef: DocumentReference<DocumentData, DocumentData>) =>
  queryOptions({
    queryKey: ['get-profile', profileRef],
    queryFn: async () => {
      if (!profileRef) throw new Error('Referência de perfil não encontrada')

      const profileSnapshot = await getDoc(
        profileRef.withConverter({
          fromFirestore: (snapshot) => profileSchema.parse({ id: snapshot.id, profileRef, ...snapshot.data() }),
          toFirestore: (profile: Profile) => profile,
        }),
      )

      if (!profileSnapshot.exists()) throw new Error('Perfil não encontrado')

      return profileSnapshot.data()
    },
    enabled: !!profileRef,
  })

export function useGetProfileQuery(profileRef: DocumentReference<DocumentData, DocumentData>) {
  return useQuery(getProfileQueryOptions(profileRef))
}
