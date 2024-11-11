import { useMutation } from '@tanstack/react-query'
import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { Charts } from '@/routes/charts'

export function useChartsMutation() {
  return useMutation({
    mutationKey: ['addCharts'],
    mutationFn: async (values: Charts) => {
      return addDoc(collection(firestore, 'charts'), values)
    },
  })
}
