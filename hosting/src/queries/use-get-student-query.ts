import { firestore } from '@/services/firebase'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'

export const getStudentsQueryOptions = (idCourse: string, idClass: string) =>
  queryOptions({
    queryKey: ['get-student', idCourse, idClass],
    queryFn: async () => {
      const classRef = doc(firestore, 'courses', idCourse, 'classes', idClass)
      const classSnapshot = await getDoc(classRef)

      const classData = classSnapshot.data()
      const studentRefs = classData?.students

      const studentSnapshots = await Promise.all(studentRefs.map((studentRef) => getDoc(studentRef)))

      const students = studentSnapshots.map((snapshot) => ({
        ...snapshot.data(),
        id: snapshot.id,
      }))

      return students
    },
  })
export function useGetStudentQuery(idCourse: string, idClass: string) {
  return useQuery(getStudentsQueryOptions(idCourse, idClass))
}
