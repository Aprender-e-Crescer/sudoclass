import { Responsible, responsibleSchema } from '@/models/responsible-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { QueryDocumentSnapshot, SnapshotOptions, doc, getDoc } from 'firebase/firestore'

export const getResponsibleFirestoreQuery = (id: string) => 
  doc(firestore, 'responsibles', id).withConverter({
    toFirestore: (data: Responsible) => data,
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) => responsibleSchema.parse(snapshot.data(options))
  })

export const getResponsibleQueryOptions = (id: string | undefined) => 
  queryOptions({
    queryKey: ['responsible', id],
    queryFn: () => getDoc(getResponsibleFirestoreQuery(id!)),
    enabled: !!id,
    select: (snapshot) => {
      if (!snapshot.exists()) throw new Error('Responsible not found')
      return snapshot.data()
    }
  })