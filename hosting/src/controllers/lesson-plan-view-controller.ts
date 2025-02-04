import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getLessonPlansQueryOptions } from '@/queries/use-list-lesson-plan'
import { useGetFullUser } from '@/hooks/use-get-full-user'

export function lessonPlanViewController(idCourse: string, idClass: string, idSubject: string) {
  const { data: lessonPlanningsList } = useQuery(
    getLessonPlansQueryOptions(idCourse, idClass, idSubject)
  )

  const fullUser = useGetFullUser()
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
    handleCheckboxChange,
  }
}
