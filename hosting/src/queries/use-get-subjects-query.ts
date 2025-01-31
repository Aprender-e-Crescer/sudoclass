import { Subject, subjectsSchema } from '@/models/subjects-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'



export function useGetSubjectsQuery(idCourse: string, idClass: string) {
  return useQuery({
    queryKey: ['get-subjects'],
    queryFn: async () => {
      const subjectsRef = collection(firestore, `courses/${idCourse}/classes/${idClass}/subjects`).withConverter({
        fromFirestore: snapshot => subjectsSchema.parse({ id: snapshot.id, ...snapshot.data() }),
        toFirestore: (subject: Subject) => subject
      })

      const querySnapshot = await getDocs(subjectsRef)
      
      const subjects = querySnapshot.docs.map(doc => doc.data())

      return subjects
    },
  })
}
