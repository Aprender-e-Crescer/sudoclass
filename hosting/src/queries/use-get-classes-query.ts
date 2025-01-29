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

      let classesRefs

      if (role === 'teacher') {
        if (!teacherSubjects) throw new Error('Subjects are not defined')
        classesRefs = teacherSubjects.map((subjectRef) => subjectRef.parent.parent)
      }

      if (role === 'student' || role === 'responsible') {
        if (!studentClasses) throw new Error('Classes are not defined')

        classesRefs = studentClasses
        console.log('Student Classes IDs:', classesRefs)
      }

      const classRef = collection(firestore, `courses/mF9o1jqPaY1IgVKHx8mu/classes`).withConverter({
        toFirestore: (classItem: Class) => classItem,
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options)
          console.log('data', data)
          return classSchema.parse({ ...data, id: snapshot.id })
        },
      })
      console.log('classRefReal', classRef)

      const conditions =
        role === 'admin'
          ? []
          : [
              where(
                documentId(),
                'in',
                classesRefs?.map((classRef) => classRef).filter((classRef) => classRef !== null),
              ),
            ]

      const queryRef = query(classRef, ...conditions)
      const querySnapshot = await getDocs(queryRef)
      console.log('querySnapshot', querySnapshot) //ate aqui vem o id do doc
      const classes = querySnapshot.docs.map((doc) => doc.data())
      console.log('result', classes) //nao retorna
      return classes
    },
    enabled:
      (!!role && (role === 'student' || role === 'responsible') && !!studentClasses) ||
      (!!role && role === 'admin') ||
      (!!role && role === 'teacher' && !!teacherSubjects),
  })

export function useGetClassesQuery(
  courseId: string,
  role: role | undefined,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined,
) {
  return useQuery(getClassesQueryOptions(courseId, role, studentClasses, teacherSubjects))
}
