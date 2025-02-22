import { firestore } from "@/services/firebase";
import { formatWithMask } from "@/utils/formatWithMask";
import { masks } from "@/utils/masks";
import { passwordGenerator } from "@/utils/password-generator";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, runTransaction } from "firebase/firestore";

interface CreateAdminInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateAdminData {
    fullName: string
    cpf: string
}

export function useCreateAdminMutation({ onSuccess, onError }: CreateAdminInput) {
    return useMutation({
        mutationKey: ['createAdmin'],
        mutationFn: async ({ cpf, fullName }: CreateAdminData) => runTransaction(firestore, async (transaction) => { 
            const { unmasked: cpfCleaned } = formatWithMask({
                text: cpf,
                mask: masks.BRL_CPF,
            });

            const userRef = doc(firestore, "users", cpfCleaned)
        
            const userAlreadyExist = await transaction.get(userRef).then((doc) => doc.exists())
        
            if (userAlreadyExist) throw new Error("Esse usuário já existe")
        
            const password = passwordGenerator()
        
            const profileRef = doc(collection(firestore, "profiles"))
            const roleRef = doc(collection(firestore, "admins"))
                
            transaction.set(userRef, {
                profileRef,
                roleRef,
                fullName,
                requireNewPassword: true,
                contact: {
                    email: null,
                    telephone: null,
                },
                address: {
                    state: null,
                    city: null,
                    street: null,
                    neighborhood: null,
                    number: null,
                },
                birth: {
                    date: null,
                    state: null,
                    city: null,
                },
                generalRegistration: {
                    number: null,
                    dispatch: {
                        date: null,
                        state: null,
                    },
                },
            })
        
            transaction.set(doc(collection(firestore, userRef.path, "credentials")), { password })
            transaction.set(profileRef, { displayName: fullName, photoURL: null })
        }),
        onSuccess,
        onError,
    })
}