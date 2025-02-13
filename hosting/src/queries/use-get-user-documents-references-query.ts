import { storage } from "@/services/firebase"
import { queryOptions } from "@tanstack/react-query"
import { listAll, ref } from "firebase/storage"

export const getUserDocumentsReferencesQueryOptions = (id: string | undefined) => queryOptions({
    queryKey: ["users", "documents", "references", id],
    queryFn: async () => {
        if (!id) return []

        return listAll(ref(storage, `users/${id}/documents`)).then(({ items }) => items)
    }
})