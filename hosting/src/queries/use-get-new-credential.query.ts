import { credentialSchema } from '@/models/credential-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, DocumentData, DocumentReference, getDocs, query, where } from 'firebase/firestore'

export const getCredentialFirestoreQuery = (profileRef: DocumentReference<DocumentData, DocumentData>) =>
  query(collection(firestore, 'requestsChangePassword'), where('profileRef', '==', profileRef))

export const getCredentialQueryOptions = (profileRef: DocumentReference<DocumentData, DocumentData>) =>
  queryOptions({
    queryKey: ['get-credential'],
    queryFn: async () => {
      const requestsSnapshot = await getDocs(getCredentialFirestoreQuery(profileRef))

      if (requestsSnapshot.empty) {
        throw new Error('Nenhuma solicitação de troca de senha encontrada.')
      }

      const requestId = requestsSnapshot.docs[0].id
      const credentialRef = collection(firestore, 'requestsChangePassword', requestId, 'credential')
      const credentialSnapshot = await getDocs(credentialRef)

      if (credentialSnapshot.empty) {
        throw new Error('Nenhuma credencial encontrada.')
      }

      return credentialSchema.parse(credentialSnapshot.docs[0].data())
    },
    select: (data) => data.password,
  })
