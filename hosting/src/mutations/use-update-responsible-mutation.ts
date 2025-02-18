import { firestore, storage } from "@/services/firebase"
import { useMutation } from "@tanstack/react-query"
import { doc, runTransaction } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

interface UpdateResponsibleInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateResponsibleData {
    id: string
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
    students: string[] // Add this field
}

export function useUpdateResponsibleMutation({ onSuccess, onError }: UpdateResponsibleInput) {
    return useMutation({
        mutationKey: ['updateResponsible'],
        mutationFn: async ({
            id,
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
        }: UpdateResponsibleData) => runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", id)
            const userDoc = await transaction.get(userRef)
            
            if (!userDoc.exists()) throw new Error("Usuário não encontrado")

            const userData = userDoc.data()
            
            transaction.update(userRef, {
                fullName,
                contact: { email, telephone },
                address: { state, city, street, neighborhood, number },
                birth: { date: birthDate, state: birthState, city: birthCity },
                generalRegistration: { number: grNumber, dispatch: { date: grDispatchDate, state: grDispatchState } },
            })

            transaction.update(userData.profileRef, { 
                displayName: fullName,
            })

            transaction.update(userData.roleRef, {
                responsibleFor: students.map(studentId => doc(firestore, 'users', studentId))
            })
        }).then(() => 
            Promise.all(
                documents.map((document) => uploadBytes(
                    ref(storage, `users/${id}/documents/${document.name}`), document)
                )
            )
        ),
        onSuccess,
        onError,
    })
}