import { Profile, profileSchema } from '@/models/profile-schema'
import { Warning } from '@/models/warning-schema'
import { firestore } from '@/services/firebase'
import { useQueries } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export function useSentByProfilesQueries(warnings: Warning[] | undefined) {
    return useQueries({
            queries: warnings?.map(({ sentByProfile }) => ({
                queryKey: ['get-profiles', sentByProfile.id],
                queryFn: async () => {
                const warningsRef = doc(firestore, 'profile', sentByProfile.id).withConverter({
                    fromFirestore: snapshot => profileSchema.parse({ id: snapshot.id, ...snapshot.data() }),
                    toFirestore: (warning: Profile) => warning
                })
            
                const documentSnapshot = await getDoc(warningsRef)
                
                const items = documentSnapshot.data()
            
                return items
                },
            })
        ) ?? [],
    })
}