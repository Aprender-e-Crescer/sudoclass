import { Profile, profileSchema } from "@/models/profile-schema";
import { firestore } from "@/services/firebase";
import { queryOptions } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const getUserProfileFirestoreQuery = (profileId: string) => doc(firestore, "profiles", profileId).withConverter({
    toFirestore: (data: Profile) => data,
    fromFirestore: (snapshot, options) => profileSchema.parse({ ...snapshot.data(options), id: snapshot.id, profileRef: snapshot.ref }), 
})

export const getUserProfileQueryOptions = (profileId: string | undefined) => queryOptions({
    queryKey: ["getUserProfile", profileId],
    queryFn: () => getDoc(getUserProfileFirestoreQuery(profileId!)),
    enabled: !!profileId,
    select: (documentSnapshot) => {
        if (!documentSnapshot.exists()) {
            throw new Error('Profile not found')
        }

        return documentSnapshot.data()
    }
}) 