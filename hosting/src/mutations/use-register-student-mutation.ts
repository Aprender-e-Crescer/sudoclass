import { Student } from '@/models/student-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, setDoc, collection } from 'firebase/firestore'
 
interface MutationResults {
  onSuccess: () => void,
  onError: () => void
}
 
export function useRegisterStudentMutation({ onSuccess, onError }: MutationResults) {
  const docRef = doc(collection(firestore, 'students'))
 
  return useMutation({
    mutationKey: ['register-student'],
    mutationFn: (values: Student) => {
      return setDoc(docRef, {
        id: values.id,
        name: values.name,
        email: values.email,
        telephone: values.telephone,
        cpf: values.cpf,
        dateOfBirth: values.dateOfBirth,
        cityOfBirth: values.cityOfBirth,
        stateOfBirth: values.stateOfBirth,
        rg: values.rg,
        shippingDate: values.shippingDate,
        shippingStatus: values.shippingStatus,
        address: {
          city: values.address.city,
          neighborhood: values.address.neighborhood,
          state: values.address.state,
          street: values.address.street,
          streetNumber: values.address.streetNumber,
        },
        responsible: values.responsible, // Firestore DocumentReference
      })
    },
    onSuccess,
   
    onError,
  })
}