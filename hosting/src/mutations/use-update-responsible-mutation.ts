import { UpdateResponsibleData } from "@/models/user-schema"
import { functions, storage } from "@/services/firebase"
import { useMutation } from "@tanstack/react-query"
import { httpsCallable } from "firebase/functions"
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage"

interface UpdateResponsibleInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateResponsibleDTO {
    id: string
    cpf: string
    roleRefPath: string
    fullName: string
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

const updateResponsible = httpsCallable<UpdateResponsibleData, string>(functions, 'updateResponsible')

export function useUpdateResponsibleMutation({ onSuccess, onError }: UpdateResponsibleInput) {
    return useMutation({
        mutationKey: ['updateResponsible'],
        mutationFn: async ({
            id,
            cpf,
            roleRefPath,
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
        }: UpdateResponsibleDTO) => updateResponsible({
            id,
            roleRefPath,
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
            fullName,
            responsibleFor: students,
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