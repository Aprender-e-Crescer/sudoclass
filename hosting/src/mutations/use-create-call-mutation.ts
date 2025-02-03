import { useMutation } from '@tanstack/react-query'
import { writeBatch, DocumentData, DocumentReference } from 'firebase/firestore'

export interface CreateSchoolCallMutation {
  studentProfileRef: DocumentReference<DocumentData, DocumentData> | undefined
}

export function useCreateSchoolCallMutation() {
  return useMutation({
    mutationKey: ['create-school-call'],
    mutationFn: async (batch: ReturnType<typeof writeBatch>) => {
      await batch.commit()
    },
    onError: (error) => {
      throw new Error(error.message)
    },
  })
}
