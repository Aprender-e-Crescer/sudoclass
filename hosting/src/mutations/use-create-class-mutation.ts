import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, doc, DocumentData, DocumentReference, writeBatch } from 'firebase/firestore'

interface CreateClassMutationData {
  name: string
  color: string
  shift: 'morning' | 'afternoon' | 'night'
  startDate: Date
  endDate: Date
  subscriptionEndDate: Date
  workload: number
  availableVacancies: number
  studentsProfile: DocumentReference<DocumentData, DocumentData>[]
}

interface CreateClassMutationInput {
  idCourse: string
  onError: (err: Error) => void
  onSuccess: (idClass: string) => void
}
export function useCreateClassMutation({ idCourse, onError, onSuccess }: CreateClassMutationInput) {
  return useMutation({
    mutationKey: ['create-class'],
    mutationFn: async ({
      name,
      color,
      shift,
      startDate,
      endDate,
      subscriptionEndDate,
      workload,
      availableVacancies,
      studentsProfile,
    }: CreateClassMutationData) => {
      const batch = writeBatch(firestore)

      const classesRef = collection(firestore, 'courses', idCourse, 'classes')
      const idClass = (await addDoc(classesRef, {})).id
      const newClassRef = doc(firestore, 'courses', idCourse, 'classes', idClass)

      batch.set(newClassRef, {
        name,
        color,
        shift,
        startDate,
        endDate,
        subscriptionEndDate,
        workload,
        availableVacancies,
        studentsProfile,
      })

      await batch.commit()
      return idClass
    },
    onError,
    onSuccess,
  })
}
