import { CreateAdminData } from "@/models/user-schema";
import { functions } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";

interface CreateAdminInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateAdminDTO {
    fullName: string
    cpf: string
}

const createAdmin = httpsCallable<CreateAdminData, string>(functions, 'createAdmin')

export function useCreateAdminMutation({ onSuccess, onError }: CreateAdminInput) {
    return useMutation({
        mutationKey: ['createAdmin'],
        mutationFn: async ({ cpf, fullName }: CreateAdminDTO) => createAdmin({
            cpf,
            fullName,
        }),
        onSuccess,
        onError,
    })
}