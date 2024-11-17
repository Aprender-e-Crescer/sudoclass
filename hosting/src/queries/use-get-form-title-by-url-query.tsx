import { GetTitleData } from "@/models/form-schema";
import { functions } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query"
import { httpsCallable } from "firebase/functions";

const getTitleByUrl = httpsCallable<GetTitleData, string | null>(functions, 'getTitleByUrl');

export function useGetFormTitleByUrlQuery(url: string) {
    return useQuery({
        queryKey: ["get-form-title-by-url", url],
        queryFn: () => getTitleByUrl({ url }),
    })
}