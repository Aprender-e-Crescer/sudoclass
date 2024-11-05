import { CreationClass } from '@/models/creation-class-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { collection, doc, setDoc } from 'firebase/firestore'

export function useRegisterClassMutation() {
  const docRef = doc(collection(firestore, 'cities'))

  return useMutation({
    mutationKey: ['register-class'],
    mutationFn: (values: CreationClass) => {
      return setDoc(docRef, { values })
    },
  })
}
