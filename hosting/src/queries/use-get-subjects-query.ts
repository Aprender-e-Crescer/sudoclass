import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'



export function useGetSubjectsQuery(idCourse: string, idClass: string) {
  return useQuery({
    queryKey: ['get-subjects'],
    queryFn: async () => {
      const subjectsRef = collection(firestore, `courses/${idCourse}/classes/${idClass}/subjects`)
      const querySnapshot = await getDocs(subjectsRef)
      
      const subjects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return subjects
    },
  })
}
