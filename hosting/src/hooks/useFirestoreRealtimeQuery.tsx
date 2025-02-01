import { DefaultError, DefinedInitialDataOptions, QueryClient, QueryKey, UndefinedInitialDataOptions, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { onSnapshot, Query } from "firebase/firestore"

function useFirestoreRealtimeQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, q: Query, queryClient?: QueryClient): UseQueryResult<TData, TError>;
function useFirestoreRealtimeQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, q: Query, queryClient?: QueryClient): UseQueryResult<TData, TError>;
function useFirestoreRealtimeQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>, q: Query, queryClient = useQueryClient()) {
    const result = useQuery(options)

    useQuery({
        queryKey: [options.queryKey, 'subscription'],
        queryFn: () => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                queryClient.setQueryData(options.queryKey, snapshot.docs.map(doc => doc.data()))
            })

            return unsubscribe
        }
    })

    return result
}

export { useFirestoreRealtimeQuery }