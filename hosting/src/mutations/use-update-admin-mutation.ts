import { UpdateAdminData } from "@/models/user-schema";
import { functions } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";

interface UpdateAdminInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateAdminDTO {
    id: string
    fullName: string
}

const updateAdmin = httpsCallable<UpdateAdminData, string>(functions, 'updateAdmin')

export function useUpdateAdminMutation({ onError, onSuccess }: UpdateAdminInput) {
    return useMutation({
        mutationKey: ['updateAdmin'],
        mutationFn: ({ fullName, id }: UpdateAdminDTO) => updateAdmin({
            fullName,
            id,
        }),
        onSuccess,
        onError,
    })
}