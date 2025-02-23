import { Submit, submitsSchema } from '@/models/submits-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, query, where, DocumentReference, limit } from 'firebase/firestore'

interface DataToSearchSubmits {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
  profileRef?: DocumentReference
}

export const getSubmitsFirestoreQuery = (data: DataToSearchSubmits) => {
  let q = query(
    collection(
      firestore,
      'courses',
      data.idCourse,
      'classes',
      data.idClass,
      'subjects',
      data.idSubject,
      'activities',
      data.idActivity,
      'submits',
    ).withConverter({
      fromFirestore: (snapshot) => {
        try {
          return submitsSchema.parse({ id: snapshot.id, ...snapshot.data() })
        } catch (error) {
          console.error('Erro ao validar dados do Firestore:', error)
          throw error
        }
      },
      toFirestore: (submit: Submit) => submit,
    }),
  )

  if (data.profileRef) {
    q = query(q, where('studentProfile', '==', data.profileRef), limit(1))
  }

  return q
}

export const getSubmitsQueryOptions = (data: DataToSearchSubmits) =>
  queryOptions({
    queryKey: ['get-submits', data],
    queryFn: async () => {
      try {
        const snapshot = await getDocs(getSubmitsFirestoreQuery(data))

        if (data.profileRef) {
          return snapshot.docs.length > 0 ? snapshot.docs[0].data() : null
        }
      } catch (error) {
        return data.profileRef ? null : []
      }
    },

    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
