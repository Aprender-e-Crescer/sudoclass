import { CreationClass } from '@/models/creation-class-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { collection, doc, setDoc } from 'firebase/firestore'

export function useRegisterClassMutation() {
  const docRef = doc(collection(firestore, 'classes'))

  return useMutation({
    mutationKey: ['register-class'],
    mutationFn: (values: CreationClass) => {
      return setDoc(docRef, {
        class: values.class,
        shift: values.shift,
        startForecast: values.startForecast,
        endPrediction: values.endPrediction,
        registrationEndlDate: values.registrationFinalDate,
        numberOfHours: values.quantityHours,
        totalVacancies: values.totalVacancies,
        // completed: values.
        // released: values.
      })
    },
  })
}
