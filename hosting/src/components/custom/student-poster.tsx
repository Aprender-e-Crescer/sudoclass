import { StudentStatus } from '@/controllers/use-call-controller'
import { X, Undo2, Check } from 'lucide-react'
import TinderCard from 'react-tinder-card'

interface Student {
  id: string
  displayName: string
  photoURL: string
}

interface StudentPosterProps {
  students: Student[]
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  updateStudentStatus: (id: string, status: StudentStatus) => void
  handleReject: () => void
  handleAccept: () => void
  handleUndo: () => void
}

export function StudentPoster({ students, currentIndex, handleReject, handleAccept, handleUndo }: StudentPosterProps) {
  if (!students || students.length === 0) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-[375px] h-[600px]">
        {currentIndex >= 0 && currentIndex < students.length && (
          <TinderCard
            className="absolute w-full h-full"
            key={students[currentIndex].id}
            onSwipe={(dir) => (dir === 'left' ? handleReject() : handleAccept())}
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
                  className="rounded-full bg-[#DF0404] w-14 h-14 flex items-center justify-center"
                >
                  <X color="white" size={30} />
                </button>
                <button
                  onClick={handleUndo}
                  className="rounded-full bg-[#0C408FCC] w-14 h-14 flex items-center justify-center disabled:bg-gray-400"
                >
                  <Undo2 color="white" size={30} />
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-[#00B087] w-14 h-14 flex items-center justify-center"
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
