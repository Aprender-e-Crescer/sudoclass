import { firestore } from '@/services/firebase'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'

export function useCreateDailyTeachingPlan(schoolMatrixId: string) {
  return useMutation({
    mutationKey: ['useCreateDailyTeachingPlan'],
    mutationFn: (values: any) =>
      addDoc(collection(firestore, 'schoolMatrices', schoolMatrixId, 'dailyLessonPlan'), values),
  })
}
