
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { Activity, activitySchema } from '@/models/activity-schema';

export function useSearchActivitiesQuery () {
return useQuery({
        queryKey: ['getActivities'],
        queryFn: () => {
        const usersRef = collection(firestore, 'activities').withConverter({
            toFirestore: (activity: Activity) => activity,
            fromFirestore: (snapshot) => activitySchema.parse(snapshot.data()),
        });

        return getDocs(usersRef).then(({ docs }) => docs.map((doc) => doc.data()))
        },
    })

}