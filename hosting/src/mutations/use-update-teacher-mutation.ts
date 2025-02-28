import { UpdateTeacherData } from "@/models/user-schema";
import { functions, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";

interface UpdateTeacherInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateTeacherDTO {
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
    subjects: string[]
}

const updateTeacher = httpsCallable<UpdateTeacherData, string>(functions, 'updateTeacher')

export function useUpdateTeacherMutation({ onError, onSuccess }: UpdateTeacherInput) {
    return useMutation({
        mutationKey: ['updateTeacher'],
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
            subjects,
        }: UpdateTeacherDTO) => updateTeacher({
            id,
            subjects,
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
            generalRegistration: {
                dispatch: {
                    date: grDispatchDate,
                    state: grDispatchState,
                },
                number: grNumber,
            },
            contact: {
                email,
                telephone,
            },
            roleRefPath,
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