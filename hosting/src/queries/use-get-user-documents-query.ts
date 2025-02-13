import { queryOptions } from "@tanstack/react-query"
import { getBlob, StorageReference } from "firebase/storage"

export const getUserDocumentsQueryOptions = (ref: StorageReference) => queryOptions({
    queryKey: ["getDocument", ref.fullPath],
    queryFn: () =>  getBlob(ref).then((blob) => new File([blob], ref.name, {
            type: blob.type,
        }))
})