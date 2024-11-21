import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { chartsSchema, Charts } from '@/routes/_authenticated/charts'

export function useChartsQuery() {
  return useQuery({
    queryKey: ['getCharts'],
    queryFn: async () => {
      const chartsRef = collection(firestore, 'charts').withConverter({
        toFirestore: (charts: Charts) => charts,
        fromFirestore: (snapshot) => chartsSchema.parse(snapshot.data()),
      })
      const snapshot = await getDocs(chartsRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
