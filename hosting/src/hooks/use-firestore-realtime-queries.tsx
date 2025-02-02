import { QueryKey, useQueries, useQueryClient } from "@tanstack/react-query"
import { DocumentReference, onSnapshot, Query } from "firebase/firestore"

interface Queries {
    queryKey: QueryKey
    q: Query | DocumentReference
}

function useFirestoreRealtimeQueries(queries: Queries[], queryClient = useQueryClient()) {
    useQueries({
        queries: queries.map(({ q, queryKey }) => ({
            queryKey: ['realtime-subscription', queryKey],
            queryFn: () => {
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    queryClient.setQueryData(queryKey, snapshot)
                })

                return unsubscribe
            }
        }))
    })
}

export { useFirestoreRealtimeQueries }
