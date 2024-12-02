import { useState } from 'react'
import { Check, Undo2, X } from 'lucide-react'
import TinderCard from 'react-tinder-card'
import { useCreateSchoolCallMutation } from '@/mutations/use-create-call-mutation'
import { format } from 'date-fns'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/services/api'

const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/call',
)({})

function useSubjectId() {
  const { idSubject } = Route.useParams()
  return Number(idSubject)
}

export function StudentPoster({ students, currentIndex, onStudentUpdate, setCurrentIndex, date }) {
  const subjectId = useSubjectId()
  const [swipedIndices, setSwipedIndices] = useState([])
  const [callHistory, setCallHistory] = useState([])
  const createSchoolCall = useCreateSchoolCallMutation()

  function generateRandomCallId() {
    return Math.floor(1000 + Math.random() * 9000)
  }

  const handleSwipe = async (direction, selectedDate) => {
    if (students && currentIndex >= 0 && currentIndex < students.length) {
      const studentId = students[currentIndex].id
      const status = direction === 'right'

      const currentDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0]

      if (!subjectId) {
        console.error('Erro: idSubject não está disponível.')
        return
      }

      const currentCallId = generateRandomCallId()

      try {
        await createSchoolCall.mutateAsync({
          id_chamada: currentCallId,
          id_materia: subjectId,
          data: currentDate,
          id_aluno: studentId,
          status,
        })

        if (direction === 'left') {
          onStudentUpdate(studentId, 'lack')
        } else if (direction === 'right') {
          onStudentUpdate(studentId, 'present')
        }

        setCallHistory((prev) => [...prev, { studentId, callId: currentCallId, direction, date: currentDate }])

        setSwipedIndices((prev) => [...prev, currentIndex])

        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          return nextIndex < students.length ? nextIndex : prevIndex
        })
      } catch (error) {
        console.error('Erro ao criar a chamada:', error)
      }
    }
  }

  const handleReject = () => handleSwipe('left', date)
  const handleAccept = () => handleSwipe('right', date)

  const handleUndo = async () => {
    if (callHistory.length > 0) {
      const lastCall = callHistory[callHistory.length - 1]
      setCallHistory((prev) => prev.slice(0, -1))
      setSwipedIndices((prev) => prev.slice(0, -1))

      try {
        await api.delete(`/schoolCall/delete/${lastCall.callId}`)
        console.log(`Chamada ${lastCall.callId} excluída com sucesso!`)
      } catch (error) {
        console.error('Erro ao excluir a chamada:', error)
      }

      setCurrentIndex(students.findIndex((student) => student.id === lastCall.studentId))
    }
  }

  if (!students || students.length === 0) {
    return <div>loading...</div>
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-[375px] h-[600px]">
        {currentIndex >= 0 && currentIndex < students.length && (
          <TinderCard
            className="absolute w-full h-full"
            key={students[currentIndex].id}
            onSwipe={(dir) => handleSwipe(dir, date)}
            preventSwipe={['up', 'down']}
          >
            <div className="relative bg-white border-2 w-full h-full shadow-lg flex flex-col items-center justify-end p-6 rounded-md">
              <div className="w-full h-[500px] bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <img
                  src={
                    'https://media.istockphoto.com/id/1408041355/pt/foto/happy-black-businesswoman-using-a-smartphone-in-a-creative-office.jpg?s=612x612&w=0&k=20&c=pee_hk8ZXj4HVeitj8ASOQ1qCPhIZI18WcoDIkMe2BU='
                  }
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <h2 className="text-xl font-bold text-[#333333]">{students[currentIndex].name}</h2>

              <div className="flex w-full justify-evenly flex-wrap mt-4">
                <button
                  onClick={handleReject}
                  className="rounded-full bg-[#DF0404] w-14 h-14 flex items-center justify-center md:w-16 md:h-16"
                >
                  <X color="white" size={30} />
                </button>
                <button
                  onClick={handleUndo}
                  disabled={callHistory.length === 0}
                  className="rounded-full bg-[#0C408FCC] w-14 h-14 flex items-center justify-center md:w-16 md:h-16 disabled:bg-gray-400"
                >
                  <Undo2 color="white" size={30} />
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-[#00B087] w-14 h-14 flex items-center justify-center md:w-16 md:h-16"
                >
                  <Check color="white" size={30} />
                </button>
              </div>
            </div>
          </TinderCard>
        )}
      </div>
    </div>
  )
}
