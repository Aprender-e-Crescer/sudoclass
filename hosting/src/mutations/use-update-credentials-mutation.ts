import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { collection, doc, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from 'firebase/firestore'

interface UpdateCredentialsMutationData {
  profileRef: DocumentReference<DocumentData, DocumentData>
  password: string
}

interface UpdateCredentialsMutationInput {
  onError: (error: Error) => void
  onSuccess: () => void
}

export function useUpdateCredentialsMutation({ onError, onSuccess }: UpdateCredentialsMutationInput) {
  return useMutation({
    mutationKey: ['updateCredentials'],
    mutationFn: async ({ profileRef, password }: UpdateCredentialsMutationData) => {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('profileRef', '==', profileRef))
      const userSnapshot = await getDocs(q)

      if (userSnapshot.empty) {
        throw new Error('Usuário não encontrado.')
      }

      const userDoc = userSnapshot.docs[0]
      const userId = userDoc.id

      const credentialsRef = collection(firestore, 'users', userId, 'credentials')
      const credentialsSnapshot = await getDocs(credentialsRef)

      if (credentialsSnapshot.empty) {
        throw new Error('Nenhuma credencial encontrada para este usuário.')
      }

      const credentialDoc = credentialsSnapshot.docs[0]
      const credentialId = credentialDoc.id

      const credentialDocRef = doc(firestore, 'users', userId, 'credentials', credentialId)

      await updateDoc(credentialDocRef, { password })
    },
    onError,
    onSuccess,
  })
}
