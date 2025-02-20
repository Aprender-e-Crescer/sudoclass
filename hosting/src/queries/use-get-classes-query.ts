import { Student } from '@/models/student-schema'
import { Teacher } from '@/models/teacher-schema'
import { firestore } from '@/services/firebase'
import { role } from '@/types/user'
import { queryOptions } from '@tanstack/react-query'
import { collection, query, where, getDocs, documentId } from 'firebase/firestore'
import { Class, classSchema } from '@/models/class-schema'
import { Course } from '@/models/course-schema'

function getClassRefs(role: role, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) {
  if (role === 'teacher') {
    if (!teacherSubjects) throw new Error('Subjects are not defined')
    return teacherSubjects.map((subjectRef) => subjectRef.parent.parent)
  }

  if (role === 'student' || role === 'responsible') {
    if (!studentClasses) throw new Error('Classes are not defined')

    return studentClasses.map((classRef) => classRef)
  }
}

export function getClassesFirestoreQuery(
  courseId: string,
  role: role,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined
) {
  const classRefs = getClassRefs(role, studentClasses, teacherSubjects)

  const classCollectionRef = collection(firestore, 'courses', courseId, 'classes').withConverter({
    toFirestore: (classItem: Class) => classItem,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)

      return classSchema.parse({ ...data, idCourse: courseId, id: snapshot.id, ref: snapshot.ref })
    },
  })

  const conditions = role === 'admin' ? [] : [where(documentId(), 'in', classRefs)]

  return query(classCollectionRef, ...conditions)
}

export const getClassesQueryOptions = (
  courseId: string,
  role: role,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined,
) =>
  queryOptions({
    queryKey: ['getClasses', courseId, role, studentClasses, teacherSubjects],
    queryFn: () => getDocs(getClassesFirestoreQuery(courseId, role, studentClasses, teacherSubjects)),
    select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  })

export function getClassesQueriesOptions(
  courses: Course[],
  role: role,
  studentClasses: Student['classes'] | undefined,
  teacherSubjects: Teacher['subjects'] | undefined
) {
  const classesQueriesOptions = courses.map(({ id }) => getClassesQueryOptions(id, role, studentClasses, teacherSubjects))

  return classesQueriesOptions.map((queryOptions) => ({
    classesQueryOptions: queryOptions,
    classesFirestoreQuery: getClassesFirestoreQuery(queryOptions.queryKey[1] as string, role, studentClasses, teacherSubjects),
  }))
}
