import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

interface useGetSubjectsProps {
  idCourse: string
  idClass: string
}

export function useGetSubjectsQuery({idCourse, idClass}: useGetSubjectsProps) {
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
