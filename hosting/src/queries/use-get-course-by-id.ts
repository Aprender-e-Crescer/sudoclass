import { Course, courseSchema } from "@/models/course-schema"
import { firestore } from "@/services/firebase"
import { queryOptions } from "@tanstack/react-query"
import { doc, getDoc } from "firebase/firestore"

export const getCourseFirestoreQuery = (idCourse: string) =>
  doc(firestore, "courses", idCourse).withConverter({
    fromFirestore: (snapshot) =>
      courseSchema.parse({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (course: Course) => course,
  })

export const getCourseQueryOptions = (idCourse: string) =>
  queryOptions({
    queryKey: ["get-course", idCourse],
    queryFn: () => getDoc(getCourseFirestoreQuery(idCourse)),
    select: (snapshot) => {
      if (!snapshot.exists()) throw new Error("Course not found")

      return snapshot.data()
    },
  })