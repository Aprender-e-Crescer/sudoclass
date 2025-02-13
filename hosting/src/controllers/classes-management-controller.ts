import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query'
import { getCourseQueryOptions } from '@/queries/use-get-course-by-id'
import { getSubjectsFirestoreQuery, getSubjectsQueryOptions } from '@/queries/use-get-subjects-query'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useClassesManagementController(idCourse: string, idClass: string) {
  const courseQueryOptions = getCourseQueryOptions(idCourse)
  const subjectsQueryOptions = getSubjectsQueryOptions(idCourse, idClass)

  const { data: course } = useSuspenseQuery(courseQueryOptions)
  const { data: subjects } = useSuspenseQuery(subjectsQueryOptions)
  useFirestoreRealtimeQuery(subjectsQueryOptions.queryKey, getSubjectsFirestoreQuery(idCourse, idClass))

  return {
    course,
    subjects,
  }
}
