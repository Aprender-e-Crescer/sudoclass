import { useState } from 'react'
import { Check, Undo2, X } from 'lucide-react'
import TinderCard from 'react-tinder-card'
import { useCreateSchoolCallMutation } from '@/mutations/use-create-call-mutation'
import { createFileRoute } from '@tanstack/react-router'
import { DocumentData, DocumentReference } from 'firebase/firestore'

interface Student {
  id: string
  displayName: string
  photoURL: string
  profileRef: DocumentReference<DocumentData, DocumentData>
}

interface StudentPosterProps {
  students: Student[]
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  updateStudentStatus: (id: string, status: string) => void
}

const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/$idLessonPlan/call',
)({
  component: StudentPoster,
})

export function StudentPoster({ students, currentIndex, setCurrentIndex, updateStudentStatus }: StudentPosterProps) {
  const { idCourse, idClass, idSubject, idLessonPlan } = Route.useParams()
  const [swipedIndices, setSwipedIndices] = useState<number[]>([])
  const [callHistory, setCallHistory] = useState<{ studentId: string; direction: string }[]>([])
  const createSchoolCall = useCreateSchoolCallMutation(idCourse, idClass, idSubject, idLessonPlan)

  const handleSwipe = async (direction: string) => {
    if (students && currentIndex >= 0 && currentIndex < students.length) {
      const studentId = students[currentIndex].id
      const profileRef = students[currentIndex].profileRef

      try {
        const status = direction === 'left' ? 'lack' : 'present'
        updateStudentStatus(studentId, status)

        if (direction === 'left') {
          await createSchoolCall.mutateAsync({ studentProfileRef: profileRef })
        }

        setCallHistory((prev) => [...prev, { studentId, direction }])
        setSwipedIndices((prev) => [...prev, currentIndex])

        setCurrentIndex((prevIndex) => (prevIndex + 1 < students.length ? prevIndex + 1 : prevIndex))
      } catch (error) {
        console.error('Erro ao criar a chamada:', error)
      }
    }
  }

  const handleReject = () => handleSwipe('left')
  const handleAccept = () => handleSwipe('right')

  const handleUndo = async () => {
    if (callHistory.length > 0) {
      const lastCall = callHistory[callHistory.length - 1]
      setCallHistory((prev) => prev.slice(0, -1))
      setSwipedIndices((prev) => prev.slice(0, -1))

      // try {
      //   await api.delete(`/schoolCall/delete/${lastCall.callId}`)
      //   console.log(`Chamada ${lastCall.callId} excluída com sucesso!`)
      // } catch (error) {
      //   console.error('Erro ao excluir a chamada:', error)
      // }

      setCurrentIndex(students.findIndex((student) => student.id === lastCall.studentId))
    }
  }

  if (!students || students.length === 0) {
    return <div>loading...</div>
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
            onSwipe={(dir) => handleSwipe(dir)}
            preventSwipe={['up', 'down']}
          >
            <div className="relative bg-white border-2 w-full h-full shadow-lg flex flex-col items-center justify-end p-6 rounded-md">
              <div className="w-full h-[500px] bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <img
                  src={students[currentIndex].photoURL || 'https://via.placeholder.com/150'}
                  className="w-full h-full object-cover rounded-md"
                  alt={`Foto de ${students[currentIndex].displayName}`}
                />
              </div>

              <h2 className="text-xl font-bold text-[#333333]">{students[currentIndex].displayName}</h2>

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
