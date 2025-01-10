import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'

export function useGetCoursesQuery() {
  return useQuery({
    queryKey: ['getCourses'],
    queryFn: async () => {
      const courseRef = collection(firestore, 'courses')
      const querySnapshot = await getDocs(courseRef)
      const courses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return courses
    },
  })

}
