import { credentialSchema } from "@/models/credentialSchema";
import { firestore, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, getDocs, limit, query, runTransaction } from "firebase/firestore";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";

interface UpdateStudentInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateStudentData {
    id: string
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

export function useUpdateStudentMutation({ onError, onSuccess }: UpdateStudentInput) {
    return useMutation({
        mutationKey: ['updateStudent'],
        mutationFn: ({
            id,
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
        }: UpdateStudentData) => runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", id)
        
            const userSnapshot = await transaction.get(userRef)
            const userDontExists = !userSnapshot.exists()
            const userData = userSnapshot.data()
        
            if (userDontExists) throw new Error("User not found")

            const newUserRef = doc(firestore, "users", cpf)
        
            if (userRef.id === newUserRef.id) {
                transaction.update(userRef, {
                    fullName,
                    requireNewPassword: true,
                    contact: { email, telephone },
                    address: { state, city, street, neighborhood, number },
                    birth: { date: birthDate, state: birthState, city: birthCity },
                    generalRegistration: { number: grNumber, dispatch: { date: grDispatchDate, state: grDispatchState } },                
                })
                
                transaction.set(userData?.roleRef, { classes: classes.map((classPath) => doc(firestore, classPath)) })

                return
            }
            
            const credentialQuerySnapshot = await getDocs(
                query(
                    collection(firestore, userRef.path, "credentials"), limit(1)
                )
            )

            const credentialSnapshot = credentialQuerySnapshot.docs[0]

            const credential = credentialSchema.parse(credentialSnapshot.data())

            const profileRef = doc(collection(firestore, "profiles"))
            const roleRef = doc(collection(firestore, "students"))

            transaction.delete(userRef)
            transaction.delete(credentialSnapshot.ref)
            transaction.delete(userData?.roleRef)

            transaction.set(newUserRef, {
                profileRef,
                roleRef,
                fullName,
                requireNewPassword: true,
                contact: { email, telephone },
                address: { state, city, street, neighborhood, number },
                birth: { date: birthDate, state: birthState, city: birthCity },
                generalRegistration: { number: grNumber, dispatch: { date: grDispatchDate, state: grDispatchState } },                
            })
            transaction.set(doc(collection(firestore, newUserRef.path, "credentials")), credential)
            transaction.set(roleRef, { classes: classes.map((classPath) => doc(firestore, classPath)) })
        })
        .then(() => listAll(ref(storage, `users/${cpf}/documents`)))
        .then(({ items }) => {
            const { itemsToDelete, itemsToUpload } = {
                itemsToDelete: items.filter((item) => documents.find(document => item.name !== document.name)),
                itemsToUpload: documents.filter((document) => items.find(item => item.name !== document.name))
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