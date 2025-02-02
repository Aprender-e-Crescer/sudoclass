import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"
import { DocumentReference, onSnapshot, Query } from "firebase/firestore"

function useFirestoreRealtimeQuery(queryKey: QueryKey, q: Query | DocumentReference, queryClient = useQueryClient()) {
    useQuery({
        queryKey: ['realtime-subscription', queryKey],
        queryFn: () => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                queryClient.setQueryData(queryKey, snapshot)
            })

            return unsubscribe
        }
    })
}

export { useFirestoreRealtimeQuery }
