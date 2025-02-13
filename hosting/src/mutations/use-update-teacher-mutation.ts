import { credentialSchema } from "@/models/credentialSchema";
import { firestore, storage } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, getDocs, limit, query, runTransaction } from "firebase/firestore";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";

interface UpdateTeacherInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateTeacherData {
    id: string
    fullName: string
    cpf: string
    documents: File[]
}

export function useUpdateTeacherMutation({ onError, onSuccess }: UpdateTeacherInput) {
    return useMutation({
        mutationKey: ['updateTeacher'],
        mutationFn: ({ cpf, fullName, id, documents }: UpdateTeacherData) => runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", id)
        
            const userSnapshot = await transaction.get(userRef)
            const userDontExists = !userSnapshot.exists
            const userData = userSnapshot.data()
        
            if (userDontExists) throw new Error("User not found")

            const newUserRef = doc(firestore, "users", cpf)
        
            if (userRef.id === newUserRef.id) return transaction.update(userRef, { fullName })
            
            const credentialQuerySnapshot = await getDocs(
                query(
                    collection(firestore, userRef.path, "credentials"), limit(1)
                )
            )

            const credentialSnapshot = credentialQuerySnapshot.docs[0]

            const credential = credentialSchema.parse(credentialSnapshot.data())

            transaction.delete(userRef)
            transaction.delete(credentialSnapshot.ref)
            transaction.set(newUserRef, { ...userData, fullName })
            transaction.set(doc(collection(firestore, newUserRef.path, "credentials")), credential)
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