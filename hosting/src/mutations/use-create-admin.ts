import { functions } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";

interface CreateAdminInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateAdminData {
    fullName: string
    cpf: string
}

const createAdmin = httpsCallable<CreateAdminData, string>(functions, 'createAdmin')

export function useCreateAdmin({ onSuccess, onError }: CreateAdminInput) {
    return useMutation({
        mutationKey: ['createAdmin'],
        onMutate: (data: CreateAdminData) => createAdmin(data),
        onSuccess,
        onError,
    })
}