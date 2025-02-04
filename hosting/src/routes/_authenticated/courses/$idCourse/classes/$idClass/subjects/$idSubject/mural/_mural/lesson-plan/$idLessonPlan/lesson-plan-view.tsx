import { createFileRoute } from '@tanstack/react-router'
import { Check, ClipboardListIcon, X } from 'lucide-react'
import { Else, If, Then } from 'react-if'

import { format } from 'date-fns'
import { lessonPlanViewController } from '@/controllers/lesson-plan-view-controller'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
})

export function LessonPlanView() {
  const { idCourse, idClass, idSubject } = Route.useParams()

  const { lessonPlanningsList, hasPermissionToEditLessonPlan, selectedDate, selectedIds, handleCheckboxChange } =
    lessonPlanViewController(idCourse, idClass, idSubject)

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
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
                <ClipboardListIcon className="w-5 h-5" />
                Realizar chamada
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {lessonPlanningsList?.map((item) => {
            const itemDate = format(new Date(item.startDate), 'dd/MM/yyyy')

            return (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 border-b w-1/12">{itemDate}</td>
                <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.startDate), 'HH:mm')}</td>
                <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.endDate), 'HH:mm')}</td>
                <td className="py-4 px-6 border-b w-1/2 whitespace-normal break-words">
                  {item.teachingDetails.content}
                </td>
                <td className="py-4 px-6 border-b w-1/6 text-center">
                  <div className="flex justify-center items-center">
                    <If condition={hasPermissionToEditLessonPlan}>
                      <Then>
                        <If condition={item.isCallMade}>
                          <Then>
                            <Check color="green" />
                          </Then>
                          <Else>
                            <input
                              type="checkbox"
                              className="w-6 h-6 accent-blue-600 cursor-pointer"
                              checked={selectedIds.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id, item.startDate)}
                              disabled={selectedDate !== null && selectedDate !== itemDate}
                            />
                          </Else>
                        </If>
                      </Then>
                    </If>

                    <If condition={!hasPermissionToEditLessonPlan}>
                      <Then>
                        <If condition={item.isCallMade}>
                          <Then>
                            <Check color="green" />
                          </Then>
                          <Else>
                            <X color="red" />
                          </Else>
                        </If>
                      </Then>
                    </If>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
