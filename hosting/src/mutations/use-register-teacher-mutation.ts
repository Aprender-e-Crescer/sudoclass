import { RegisterRequests } from '@/models/teachers-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, setDoc, collection } from 'firebase/firestore'

interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}

export function useRegisterTeacherMutation({ onSuccess, onError }: MutationResults) {
  const docRef = doc(collection(firestore, 'cities'))

  return useMutation({
    mutationKey: ['register-teacher'],
    mutationFn: (values: RegisterRequests) => {
      return setDoc(docRef, {
        'number': values.number,
        'fullName': values.fullName,
        'email': values.email,
        'telephone': values.telephone,
        'state': values.state,
        'municipality': values.municipality,
        'street': values.road,
        'neighborhood': values.neighborhood,
        'dateOfBirth': values.dateOfBirth,
        'cpf': values.cpf,
        'rgNumber': values.rgNumber,
        'password': values.password,
        // alguns campos ainda não adicionados...
        // schema, query e dados do firestore estão com diferenças
      })
    },
    onSuccess,
    onError,
  })
}
