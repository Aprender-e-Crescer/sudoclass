import { Profile, profileSchema } from '@/models/profile-schema'
import { useQuery } from '@tanstack/react-query'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'

export function useGetProfileQuery(profileRef: DocumentReference<DocumentData, DocumentData> | undefined) {
  return useQuery({
    queryKey: ['get-profile', profileRef],
    queryFn: async () => {
      if (!profileRef) throw new Error('Referência de perfil não encontrada')

      const profileSnapshot = await getDoc(profileRef.withConverter({ 
        fromFirestore: snapshot => profileSchema.parse({ id: snapshot.id, ...snapshot.data() }),
        toFirestore: (profile: Profile) => profile
      }))

      return profileSnapshot.data()
    },
    enabled: !!profileRef,
  })
}
