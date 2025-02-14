import { Submit, submitsSchema } from '@/models/submits-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, query } from 'firebase/firestore'

interface DataToSearchSubmits {
  idCourse: string
  idClass: string
  idSubject: string
  idActivity: string
}

export const getSubmitsFirestoreQuery = (data: DataToSearchSubmits) =>
  query(
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

export const getSubmitsQueryOptions = (data: DataToSearchSubmits) =>
  queryOptions({
    queryKey: ['get-submits', data],
    queryFn: () => getDocs(getSubmitsFirestoreQuery(data)),
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })
