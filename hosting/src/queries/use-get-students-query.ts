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
      const studentRefs = classData?.studentsProfile
      if (!studentRefs) throw new Error('No students')

      const studentSnapshots = await Promise.all(studentRefs.map((studentRef) => getDoc(studentRef)))

      const students = studentSnapshots.map((snapshot, index) => ({
        ...snapshot.data(),
        id: snapshot.id,
        profileRef: studentRefs[index],
      }))

      return students
    },
  })
export function useGetStudentsQuery(idCourse: string, idClass: string) {
  return useQuery(getStudentsQueryOptions(idCourse, idClass))
}
