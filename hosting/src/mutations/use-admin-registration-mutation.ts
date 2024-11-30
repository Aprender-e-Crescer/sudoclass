import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, setDoc, collection } from 'firebase/firestore'

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

interface AdminData {
  nome: string;
  cpf: string;
}

export function useRegisterAdminMutation({ onSuccess, onError }: MutationResults) {
  const docRef = doc(collection(firestore, 'admins')) 

  return useMutation({
    mutationKey: ['register-admin'],
    mutationFn: (adminData: AdminData) => {
      return setDoc(docRef, {
        nome: adminData.nome,
        cpf: adminData.cpf,
      })
    },
    onSuccess,
    onError,
  })
}
