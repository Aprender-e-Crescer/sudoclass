import { Subject, subjectsSchema } from '@/models/subjects-schema'
import { firestore } from '@/services/firebase'
import { queryOptions } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getSubjectFirestoreQuery = (idCourse: string, idClass: string, idSubject: string) =>
  doc(
    firestore,
    'courses',
    idCourse,
    'classes',
    idClass,
    'subjects',
    idSubject
  ).withConverter({
    fromFirestore: snapshot =>
      subjectsSchema.parse({ ...snapshot.data(), id: snapshot.id, idCourse, idClass, ref: snapshot.ref }),
    toFirestore: (subject: Subject) => subject,
  })

export const getSubjectQueryOptions = (
  idCourse: string,
  idClass: string,
  idSubject: string
) =>
  queryOptions({
    queryKey: ['get-subject-by-id', idCourse, idClass, idSubject],
    queryFn: async () => getDoc(getSubjectFirestoreQuery(idCourse, idClass, idSubject)),
    select: (subjectSnapshot) => {
      if (!subjectSnapshot.exists()) {
        throw new Error('Subject not found')
      }

      return subjectSnapshot.data()
    }
  })

