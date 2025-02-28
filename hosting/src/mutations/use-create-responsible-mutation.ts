import { CreateResponsibleData } from "@/models/user-schema";
import { functions, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";

interface CreateResponsibleInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateResponsibleDTO {
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
    students: string[]
}

const createResponsible = httpsCallable<CreateResponsibleData, string>(functions, 'createResponsible')

export function useCreateResponsibleMutation({ onSuccess, onError }: CreateResponsibleInput) {
    return useMutation({
        mutationKey: ['createResponsible'],
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
            students,
        }: CreateResponsibleDTO) => createResponsible({
            cpf,
            fullName,
            birth: {
                city: birthCity,
                date: birthDate,
                state: birthState,
            },
            address: {
                city,
                neighborhood,
                number,
                state,
                street,
            },
            contact: {
                email,
                telephone,
            },
            generalRegistration: {
                dispatch: {
                    date: grDispatchDate,
                    state: grDispatchState,
                },
                number: grNumber,
            },
            responsibleFor: students,
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