import { CreateStudentData } from "@/models/user-schema";
import { functions, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { ref, uploadBytes } from "firebase/storage";

interface CreateStudentInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface CreateStudentDTO {
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
    classes: string[]
}

const createStudent = httpsCallable<CreateStudentData, string>(functions, 'createStudent')

export function useCreateStudentMutation({ onSuccess, onError }: CreateStudentInput) {
    return useMutation({
        mutationKey: ['createStudent'],
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
            classes,
        }: CreateStudentDTO) => createStudent({
            cpf,
            fullName,
            address: {
                city,
                neighborhood,
                number,
                state,
                street,
            },
            birth: {
                city: birthCity,
                date: birthDate,
                state: birthState,
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
            classes,
        })
        .then(() => 
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