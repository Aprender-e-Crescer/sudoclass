import { Student } from '@/models/student-schema'
import { Teacher } from '@/models/teacher-schema'
import { firestore } from '@/services/firebase'
import { role } from '@/types/user'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { collection, query, where, getDocs, documentId } from 'firebase/firestore'
import { Class, classSchema } from '@/models/class-schema'

const getClassesQueryOptions = (
  courseId: string,
  role: role | undefined,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined,
) =>
  queryOptions({
    queryKey: ['getClasses', courseId, role, studentClasses, teacherSubjects],
    queryFn: async () => {
      if (!role) throw new Error('Role is not defined')

      let classRefs

      if (role === 'teacher') {
        if (!teacherSubjects) throw new Error('Subjects are not defined')
        classRefs = teacherSubjects.map((subjectRef) => subjectRef.parent.parent?.parent.id)
      }

      if (role === 'student' || role === 'responsible') {
        if (!studentClasses) throw new Error('Classes are not defined')

        classRefs = studentClasses.map((classRef) => classRef)
        console.log('Student Classes IDs:', classRefs)
      }

      const classCollectionRef = collection(firestore, `courses/${courseId}/classes`).withConverter({
        toFirestore: (classItem: Class) => classItem,
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options)
          console.log('data', data)
          return classSchema.parse({ ...data, id: snapshot.id })
        },
      })

      const conditions = role === 'admin' ? [] : [where(documentId(), 'in', classRefs)]

      const queryRef = query(classCollectionRef, ...conditions)
      const querySnapshot = await getDocs(queryRef)
      console.log('Documents found:', querySnapshot.size)
      return querySnapshot.docs.map((doc) => doc.data())
    },
  })

export function useGetClassesQuery(
  courseId: string,
  role: role | undefined,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined,
) {
  return useQuery(getClassesQueryOptions(courseId, role, studentClasses, teacherSubjects))
}
