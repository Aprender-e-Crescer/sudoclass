import { UpdateStudentData } from "@/models/user-schema";
import { functions, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";

interface UpdateStudentInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateStudentDTO {
    id: string
    roleRefPath: string
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

const updateStudent = httpsCallable<UpdateStudentData, string>(functions, 'updateStudent')

export function useUpdateStudentMutation({ onError, onSuccess }: UpdateStudentInput) {
    return useMutation({
        mutationKey: ['updateStudent'],
        mutationFn: ({
            id,
            roleRefPath,
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
        }: UpdateStudentDTO) => updateStudent({
            id,
            fullName,
            roleRefPath,
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
            classes,
        })
        .then(() => listAll(ref(storage, `users/${cpf}/documents`)))
        .then(({ items }) => {
            const { itemsToDelete, itemsToUpload } = {
                itemsToDelete: items.filter((item) => documents.find(document => item.name !== document.name)),
                itemsToUpload: items.length === 0 ? documents : documents.filter((document) => items.find(item => item.name !== document.name))
            }

            return Promise.all([
                ...itemsToDelete.map((item) => deleteObject(item)),
                ...itemsToUpload.map((document) => uploadBytes(
                    ref(storage, `users/${cpf}/documents/${document.name}`), document)
                )
            ])
        }),
        onSuccess,
        onError,
    })
}