import { Subject, subjectsSchema } from '@/models/subjects-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export function useGetSubjectByIdQuery(idCourse: string, idClass: string, idSubject: string) {
  return useQuery({
    queryKey: ['get-subject-by-id', idCourse, idClass, idSubject],
    queryFn: async () => {
      const subjectRef = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject).withConverter({
        fromFirestore: snapshot => subjectsSchema.parse({ id: snapshot.id,...snapshot.data() }),
        toFirestore: (subject: Subject) => subject
      })
      
      const subjectSnapshot = await getDoc(subjectRef)

      if (!subjectSnapshot.exists()) {
        throw new Error('Subject not found')
      }

      return subjectSnapshot.data()
    },
  })
}
