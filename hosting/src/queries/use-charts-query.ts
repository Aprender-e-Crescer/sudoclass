import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { chartsSchema, mediumNotesSchema, Charts } from '@/models/chart-schema'

export function useChartsQuery() {
  return useQuery({
    queryKey: ['getCharts'],
    queryFn: async () => {
      const chartsRef = collection(firestore, 'charts').withConverter({
        toFirestore: (charts: Charts) => charts,
        fromFirestore: (snapshot) => chartsSchema.parse({ ...snapshot.data(), id: snapshot.id}),
      })
      const snapshot = await getDocs(chartsRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}

import { api } from '@/services/api'
import { z } from 'zod'

export function useMediumNotesQuery(idClass: number) {
  return useQuery({
    queryKey: ['useMediumNotesQuery', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/nota/${idClass}`)
      const chartData = z.array(mediumNotesSchema).parse(data)

      return chartData
    },
  })
}

