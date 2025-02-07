import { functions } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";

interface UpdateAdminInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateAdminData {
    id: string
    fullName: string
    cpf: string
}


const updateAdmin = httpsCallable<UpdateAdminData, string>(functions, 'updateAdmin')

export function useUpdateAdmin({ onError, onSuccess }: UpdateAdminInput) {
    return useMutation({
        mutationKey: ['updateAdmin'],
        onMutate: (data: UpdateAdminData) => updateAdmin(data),
        onSuccess,
        onError,
    })
}