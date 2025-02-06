import { useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getLessonPlansQueryOptions } from '@/queries/use-list-lesson-plan'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { getStudentMissingsFirestoreQuery, getStudentMissingsQueryOptions } from '@/queries/use-get-student-missings-query'
import { useFirestoreRealtimeQueries } from '@/hooks/use-firestore-realtime-queries'

export function useLessonPlanViewController(idCourse: string, idClass: string, idSubject: string) {
  const fullUser = useGetFullUser()

  const { data: lessonPlanningsList } = useQuery(
    getLessonPlansQueryOptions(idCourse, idClass, idSubject)
  )

  const missingsQueriesOptions = lessonPlanningsList?.map(({ id }) => ({
    ...getStudentMissingsQueryOptions(idCourse, idClass, idSubject, id, fullUser.profileRef),
  })) ?? []

  const missings = useQueries({
    queries: missingsQueriesOptions,
    combine: (results) => results.flatMap((result) => result.data ?? []),
  })

  useFirestoreRealtimeQueries(missingsQueriesOptions.map(({ queryKey }) => ({
    queryKey: queryKey,
    q: getStudentMissingsFirestoreQuery(idCourse, idClass, idSubject, queryKey[1], fullUser.profileRef)
  })))

  const hasPermissionToEditLessonPlan = fullUser.role === 'teacher' || fullUser.role === 'admin'

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleCheckboxChange = (id: string, date: Date) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy')

    setSelectedIds((prev) => {
      const newSelected = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      setSelectedDate(newSelected.length > 0 ? formattedDate : null)

      return newSelected
    })
  }

  return {
    lessonPlanningsList,
    hasPermissionToEditLessonPlan,
    selectedDate,
    selectedIds,
    setSelectedIds,
    handleCheckboxChange,
    missings,
  }
}
