import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { chartsSchema, mediumNotesSchema, Charts, mediumPresenceSchema, presenceMateriaSchema, presenceTurmaSchema } from '@/models/chart-schema'

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

export function useMediumNotesQuery(idClass: string) {
  return useQuery({
    queryKey: ['useMediumNotesQuery', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/nota/${idClass}`)
      const chartData = z.array(mediumNotesSchema).parse(data)

      return chartData
    },
  })
}

export function useMediumPresenceQuery(idClass: string) {
  return useQuery({
    queryKey: ['useMediumPresenceQuery', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/presenca/${idClass}`)
      const chartData = z.array(mediumPresenceSchema).parse(data)

      return chartData
    },
  })
}

export function usePresenceMateriaQuery(idClass: string) {
  return useQuery({
    queryKey: ['usePresenceMateriaQuery', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/presenca-materia/${idClass}`)
      const chartData = z.array(presenceMateriaSchema).parse(data)

      return chartData
    },
  })
}

export function usePresenceTurmaQuery(idClass: string) {
  return useQuery({
    queryKey: ['usePresenceTurmaQuery', idClass],
    queryFn: async () => {
      const { data } = await api.get(`/alunos/presenca-turma/${idClass}`)
      const chartData = z.array(presenceTurmaSchema).parse(data)

      return chartData
    },
  })
}

