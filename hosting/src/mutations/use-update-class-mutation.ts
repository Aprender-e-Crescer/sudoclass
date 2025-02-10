import { classRegisterSchema } from '@/models/class-schema'
import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { doc, DocumentData, DocumentReference, updateDoc } from 'firebase/firestore'

export interface UpdateClassMutationData {
  idClass: string
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

interface UpdateClassMutationInput {
  idCourse: string
  onError: (error: Error) => void
  onSuccess: () => void
}

export function useUpdateClassMutation({ idCourse, onError, onSuccess }: UpdateClassMutationInput) {
  return useMutation({
    mutationKey: ['update-class'],
    mutationFn: async ({
      idClass,
      name,
      color,
      shift,
      startDate,
      endDate,
      subscriptionEndDate,
      workload,
      availableVacancies,
      studentsProfile,
    }: UpdateClassMutationData) => {
      const classRef = doc(firestore, 'courses', idCourse, 'classes', idClass)

      const classData = classRegisterSchema.parse({
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

      await updateDoc(classRef, classData)
    },
    onError,
    onSuccess,
  })
}
