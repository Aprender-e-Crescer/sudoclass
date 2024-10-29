import { functions } from '@/services/firebase'
import { httpsCallable } from "firebase/functions";
import { LoginData, loginDataSchema } from '@/models/login'
import { useMutation } from "@tanstack/react-query"
import { z } from 'zod';

const loginWithCPF = httpsCallable<LoginData, string>(functions, 'loginWithCPF');

export function useLoginMutation() {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: LoginData) => 
            // EX: { cpf: '40544847008', password: '12345678' }
            loginWithCPF(loginDataSchema.parse(data))
                .then(({ data }) => z.string().parse(data))
    })
}