import { Course, courseSchema } from '@/models/course-schema'
import { Student } from '@/models/student-schema'
import { Teacher } from '@/models/teacher-schema'
import { firestore } from '@/services/firebase'
import { role } from '@/types/user'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { collection, getDocs, documentId, query, where } from 'firebase/firestore'

export const getCoursesQueryOptions = (role: role | undefined, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) => queryOptions({
  queryKey: ['getCourses', role, studentClasses, teacherSubjects],
  queryFn: async () => {
    if (!role) throw new Error('Role is not defined')

    let coursesRef;

    if (role === 'teacher') {
        if (!teacherSubjects) throw new Error('Classes is not defined')
      
        coursesRef = teacherSubjects.map((subjectRef) => subjectRef.parent.parent?.parent.parent)
    }

    if (role === 'student' || role === 'responsible') {
      if (!studentClasses) throw new Error('Classes is not defined')
      
      coursesRef = studentClasses.map((classRef) => classRef.parent.parent)
    }

    const courseRef = collection(firestore, 'courses').withConverter({
      toFirestore: (course: Course) => course,
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)

        return courseSchema.parse({ ...data, id: snapshot.id })
      },
    })
    
    const conditions = (role === 'admin' ? [] : [
      where(documentId(), 'in', coursesRef
        ?.map((courseRef) => courseRef)
        .filter((courseRef) => courseRef !== null))
    ])
    const queryRef = query(courseRef, ...conditions)
    const querySnapshot = await getDocs(queryRef)
    const courses = querySnapshot.docs.map((doc) => doc.data())

    return courses
  },
  enabled: (!!role && (role === 'student' || role === 'responsible') && !!studentClasses) || (!!role && role === 'admin') || (!!role && role === 'teacher' && !!teacherSubjects),
})


export function useGetCoursesQuery(role: role | undefined, studentClasses: Student['classes'] | undefined, teacherSubjects: Teacher['subjects'] | undefined) {
  return useQuery(getCoursesQueryOptions(role, studentClasses, teacherSubjects))
}
