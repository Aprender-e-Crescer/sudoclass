import { useState } from 'react'
import { useGetFullUser } from '@/hooks/use-get-full-user'
import { createFileRoute } from '@tanstack/react-router'
import { Check, ClipboardListIcon, X } from 'lucide-react'
import { Else, If, Then } from 'react-if'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
})

const scheduleData = [
  { id: 1, date: '15/09/24', start: '18:30', end: '22:30', plan: 'Introdução à lógica', isLack: false },
  { id: 2, date: '16/09/24', start: '18:30', end: '22:30', plan: 'Introdução à programação', isLack: false },
  { id: 3, date: '15/09/24', start: '18:30', end: '22:30', plan: 'Exercícios sobre lógica', isLack: false },
  { id: 4, date: '17/09/24', start: '18:30', end: '22:30', plan: 'Estruturas condicionais', isLack: false },
]

export function LessonPlanView() {
  const fullUser = useGetFullUser()
  const hasPermissionToEditLessonPlan = fullUser.role === 'teacher' || fullUser.role === 'admin'

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCheckboxChange = (id: number, date: string) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]

      // Atualiza a data selecionada se houver pelo menos um checkbox marcado
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
          {scheduleData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6 border-b w-1/12">{item.date}</td>
              <td className="py-4 px-6 border-b w-1/12">{item.start}</td>
              <td className="py-4 px-6 border-b w-1/12">{item.end}</td>
              <td className="py-4 px-6 border-b w-1/2 whitespace-normal break-words">{item.plan}</td>
              <td className="py-4 px-6 border-b w-1/6 text-center">
                <div className="flex justify-center items-center">
                  <If condition={hasPermissionToEditLessonPlan}>
                    <Then>
                      <input
                        type="checkbox"
                        className="w-6 h-6 accent-blue-600 cursor-pointer"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id, item.date)}
                        disabled={selectedDate !== null && selectedDate !== item.date}
                      />
                    </Then>
                    <Else>
                      <If condition={item.isLack}>
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

      {/* Debug para mostrar os IDs selecionados */}
      <div className="mt-4 p-2 bg-gray-100 rounded-md">
        <strong>IDs Selecionados:</strong> {JSON.stringify(selectedIds)}
      </div>
    </div>
  )
}
