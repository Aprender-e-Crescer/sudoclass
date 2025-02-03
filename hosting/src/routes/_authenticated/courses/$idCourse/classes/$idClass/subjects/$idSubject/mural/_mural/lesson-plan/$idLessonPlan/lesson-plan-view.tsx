import { createFileRoute } from '@tanstack/react-router'
import { ClipboardListIcon } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/lesson-plan-view',
)({
  component: LessonPlanView,
})
const scheduleData = [
  {
    date: '15/09/24',
    start: '18:30',
    end: '22:30',
    plan: '1 - Lógica em geral, introdução. Proposição Conectivos Lógicos Tabelas verdade 2 - Introdução à informática, hardware e software 1 - Lógica em geral, introdução. Proposição Conectivos Lógicos Tabelas verdade 2 - Introdução à informática, hardware e software',
  },
  ...Array(5).fill({
    date: '15/09/24',
    start: '18:30',
    end: '22:30',
    plan: '1 - Lógica em geral, introdução. Proposição Conectivos Lógicos Tabelas verdade 2 - Introdução à informática, hardware e software 1 - Lógica em geral, introdução. Proposição Conectivos Lógicos Tabelas verdade 2 - Introdução à informática, hardware e software',
  }),
]
export function LessonPlanView() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-4 px-6 border-b w-1/12">Data</th>
            <th className="py-4 px-6 border-b w-1/12">Início</th>
            <th className="py-4 px-6 border-b w-1/12">Fim</th>
            <th className="py-4 px-6 border-b w-1/2">Plano de aula</th>
            <th className="py-4 px-6 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((item, index) => (
            <tr key={index} className="border-b-b hover:bg-gray-100">
              <td className="py-4 px-6 border-b w-1/12">{item.date}</td>
              <td className="py-4 px-6 border-b w-1/12">{item.start}</td>
              <td className="py-4 px-6 border-b w-1/12">{item.end}</td>
              <td className="py-4 px-6 border-b w-1/2 whitespace-normal break-words">{item.plan}</td>
              <td className="py-4 px-6 border-b w-1/6">
                <div className="flex justify-center items-center">
                 
                  <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none flex gap-2 ">
                  <ClipboardListIcon />
                   Chamada
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
