import { useState } from 'react'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { createFileRoute } from '@tanstack/react-router'
import { Check, ClipboardListIcon, X } from 'lucide-react'
import { Else, If, Then } from 'react-if'
import { getLessonPlansQueryOptions } from '@/queries/use-list-lesson-plan'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
})

export function LessonPlanView() {
  const { idCourse, idClass, idSubject } = Route.useParams()

  const { data: LessonPlanningsList } = useQuery(getLessonPlansQueryOptions(idCourse, idClass, idSubject))

  const fullUser = useGetFullUser()
  const hasPermissionToEditLessonPlan = fullUser.role === 'teacher' || fullUser.role === 'admin'

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleCheckboxChange = (id: string, date: Date) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]

      const hasSelected = newSelected.length > 0
      setSelectedDate(hasSelected ? date : null)

      return newSelected
    })
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-4 px-6 border-b w-1/12">Data</th>
            <th className="py-4 px-6 border-b w-1/12">Início</th>
            <th className="py-4 px-6 border-b w-1/12">Fim</th>
            <th className="py-4 px-6 border-b w-1/2">Plano de aula</th>
            <th className="py-4 px-6 border-b text-center">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400">
                <ClipboardListIcon className="w-5 h-5" />
                Realizar chamada
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {LessonPlanningsList?.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.startDate), 'dd/MM/yyyy')}</td>
              <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.startDate), 'HH:mm')}</td>
              <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.endDate), 'HH:mm')}</td>
              <td className="py-4 px-6 border-b w-1/2 whitespace-normal break-words">{item.teachingDetails.content}</td>
              <td className="py-4 px-6 border-b w-1/6 text-center">
                <div className="flex justify-center items-center">
                  <If condition={hasPermissionToEditLessonPlan}>
                    <Then>
                      <input
                        type="checkbox"
                        className="w-6 h-6 accent-blue-600 cursor-pointer"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id, item.startDate)}
                        disabled={selectedDate !== null && selectedDate !== item.startDate}
                      />
                    </Then>
                    <Else>
                      <If condition={item.isCallMade}>
                        <Then>
                          <Check color="green" />
                        </Then>
                        <Else>
                          <X color="red" />
                        </Else>
                      </If>
                    </Else>
                  </If>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
