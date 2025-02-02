import { Course, courseSchema } from '@/models/course-schema'
import { Student } from '@/models/student-schema'
import { Teacher } from '@/models/teacher-schema'
import { firestore } from '@/services/firebase'
import { role } from '@/types/user'
import { queryOptions } from '@tanstack/react-query'
import { collection, getDocs, documentId, query, where } from 'firebase/firestore'

const getCourseRef = (role: role, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) => {
  if (role === 'teacher') {
    if (!teacherSubjects) throw new Error('Classes is not defined')
  
    return teacherSubjects.map((subjectRef) => subjectRef.parent.parent?.parent.parent)
  }

  if (role === 'student' || role === 'responsible') {
    if (!studentClasses) throw new Error('Classes is not defined')
    
    return studentClasses.map((classRef) => classRef.parent.parent)
  }
}

export const getCoursesFirestoreQuery = (role: role, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) => {
  const coursesRef = getCourseRef(role, studentClasses, teacherSubjects)

  const conditions = (role === 'admin' ? [] : [
    where(documentId(), 'in', coursesRef
      ?.map((courseRef) => courseRef)
      .filter((courseRef) => courseRef !== null))
  ])

  const courseRef = collection(firestore, 'courses').withConverter({
    toFirestore: (course: Course) => course,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)

      return courseSchema.parse({ ...data, id: snapshot.id })
    },
  })

  const queryRef = query(courseRef, ...conditions)

  return queryRef
}

export const getCoursesQueryOptions = (role: role, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) => queryOptions({
  queryKey: ['getCourses', role, studentClasses, teacherSubjects],
  queryFn: async () => getDocs(getCoursesFirestoreQuery(role, studentClasses, teacherSubjects)),
  select: (snapshot) => snapshot.docs.map((doc) => doc.data()),
  enabled: ((role === 'student' || role === 'responsible') && !!studentClasses) || role === 'admin' || role === 'teacher' && !!teacherSubjects,
})
