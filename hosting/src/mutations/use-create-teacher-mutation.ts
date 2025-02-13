import { firestore, storage } from "@/services/firebase";
import { formatWithMask } from "@/utils/formatWithMask";
import { masks } from "@/utils/masks";
import { passwordGenerator } from "@/utils/password-generator";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, runTransaction } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

interface CreateTeacherInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateTeacherData {
    fullName: string
    cpf: string
    email: string
    telephone: string
    state: string
    city: string
    street: string
    neighborhood: string
    number: string
    birthDate: Date
    birthState: string
    birthCity: string
    grNumber: string
    grDispatchDate: Date
    grDispatchState: string
    documents: File[]
}

export function useCreateTeacherMutation({ onSuccess, onError }: CreateTeacherInput) {
    return useMutation({
        mutationKey: ['createTeacher'],
        mutationFn: async ({
            cpf,
            fullName,
            birthCity,
            birthDate,
            birthState,
            city,
            documents,
            email,
            grDispatchDate,
            grDispatchState,
            grNumber,
            neighborhood,
            number,
            state,
            street,
            telephone,
        }: CreateTeacherData) => runTransaction(firestore, async (transaction) => { 
            const { unmasked: cpfCleaned } = formatWithMask({
                text: cpf,
                mask: masks.BRL_CPF,
            });

            const userRef = doc(firestore, "users", cpfCleaned)
        
            const userAlreadyExist = await transaction.get(userRef).then((doc) => doc.exists())
        
            if (userAlreadyExist) throw new Error("Esse usuário já existe")
        
            const password = passwordGenerator()
        
            const profileRef = doc(collection(firestore, "profiles"))
            const roleRef = doc(collection(firestore, "teachers"))
                
            transaction.set(userRef, {
                profileRef,
                roleRef,
                fullName,
                requireNewPassword: true,
                contact: { email, telephone },
                address: { state, city, street, neighborhood, number },
                birth: { date: birthDate, state: birthState, city: birthCity },
                generalRegistration: { number: grNumber, dispatch: { date: grDispatchDate, state: grDispatchState } },                
            })
        
            transaction.set(doc(collection(firestore, userRef.path, "credentials")), { password })
            transaction.set(profileRef, { displayName: fullName, photoURL: null })
            transaction.set(roleRef, { subjects: [] })
        }).then(() => 
            Promise.all(
                documents.map((document) => uploadBytes(
                        ref(storage, `users/${cpf}/documents/${document.name}`), document)
                    )
            )
        ),
        onSuccess,
        onError,
    })
}