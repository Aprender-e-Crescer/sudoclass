import { credentialSchema } from "@/models/credentialSchema";
import { firestore } from "@/services/firebase";
import { useMutation } from "@tanstack/react-query";
import { collection, doc, getDocs, limit, query, runTransaction } from "firebase/firestore";

interface UpdateTeacherInput {
    onSuccess: () => void
    onError: (error: Error) => void
}

interface UpdateTeacherData {
    id: string
    fullName: string
    cpf: string
}

export function useUpdateTeacherMutation({ onError, onSuccess }: UpdateTeacherInput) {
    return useMutation({
        mutationKey: ['updateTeacher'],
        mutationFn: ({ cpf, fullName, id }: UpdateTeacherData) => runTransaction(firestore, async (transaction) => {
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
        }),
        onSuccess,
        onError,
    })
}