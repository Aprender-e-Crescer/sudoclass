import { Course, courseSchema } from "@/models/course-schema"
import { firestore } from "@/services/firebase"
import { useQuery } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"

export function useGetCourseById(idCourse: string) {
  return useQuery({
    queryKey: ['get-course', idCourse],
    queryFn: async () => {
      const courseRef = doc(firestore, 'courses', idCourse).withConverter({
        fromFirestore: (snapshot) => courseSchema.parse({ id: snapshot.id, ...snapshot.data() }),
        toFirestore: (course: Course) => course,
      })

      const courseRefSnapshot = await getDoc(courseRef)

      if (!courseRefSnapshot.exists()) {
        throw new Error('Course not found')
      }

      return courseRefSnapshot.data()
    },
  })
}
