import { Missing, missingSchema } from '@/models/missing-schema'
import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, getDoc } from 'firebase/firestore'

export const MISSINGS_QUERY_KEY = ['get-missings']

export function useGetMissingsQuery(courseId: string, classId: string, subjectId: string, lessonPlanId: string) {
  return useQuery({
    queryKey: [...MISSINGS_QUERY_KEY, courseId, classId, subjectId, lessonPlanId],
    queryFn: async () => {
      const missingRef = collection(
        firestore,
        'courses',
        courseId,
        'classes',
        classId,
        'subjects',
        subjectId,
        'lessonPlannings',
        lessonPlanId,
        'missings',
      ).withConverter({
        toFirestore: (missing: Missing) => missing,
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options)
          return missingSchema.parse({ ...data, id: snapshot.id })
        },
      })

      const missingSnapshot = await getDocs(missingRef)

      const missings = await Promise.all(
        missingSnapshot.docs.map(async (doc) => {
          const missingData = doc.data()
          const studentRef = missingData.studentProfile

          let studentProfile = null
          if (studentRef) {
            const studentDoc = await getDoc(studentRef)
            studentProfile = studentDoc.exists() ? { id: studentDoc.id, ...(studentDoc.data() ?? {}) } : null
          }

          return { id: doc.id, ...missingData, studentProfile }
        }),
      )

      return missings
    },
  })
}
