import { useListStudentAttendanceQuery } from '@/queries/list-student-attendance-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teste')({
  component: StudentAttendanceList,
})

export function StudentAttendanceList() {
  const { data, isLoading, error } = useListStudentAttendanceQuery()

  if (isLoading)
    return (
      <p className="text-blue-500 font-semibold">Carregando frequência...</p>
    )
  if (error)
    return (
      <p className="text-red-500 font-semibold">
        Erro ao carregar frequência: {String(error)}
      </p>
    )

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Frequência dos Estudantes
      </h2>
      {data && data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((attendance, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <span className="text-gray-600">
              <strong>Data:</strong> {attendance.data.toDate().toLocaleDateString()} 
              </span>
              <span
                className={`font-semibold ${
                  attendance.status === 'present'
                    ? 'text-green-600'
                    : attendance.status === 'absent'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                }`}
              >
                <strong>Status:</strong> {attendance.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum registro encontrado.</p>
      )}
    </div>
  )
}
