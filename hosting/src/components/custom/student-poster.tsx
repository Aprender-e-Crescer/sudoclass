import { DocumentData, DocumentReference } from 'firebase/firestore'
import { X, Undo2, Check } from 'lucide-react'
import TinderCard from 'react-tinder-card'

interface Student {
  id: string
  displayName: string
  photoURL: string
  profileRef: DocumentReference<DocumentData, DocumentData>
}

interface StudentPosterProps {
  student: Student
  handleReject: (studentId: string, profileRef: DocumentReference<DocumentData, DocumentData>) => () => void
  handleAccept: (studentId: string, profileRef: DocumentReference<DocumentData, DocumentData>) => () => void
  handleUndo: () => void
}

export function StudentPoster({ student: { displayName, id, photoURL, profileRef }, handleReject, handleAccept, handleUndo }: StudentPosterProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-[375px] h-[600px]">
        <TinderCard
          className="absolute w-full h-full"
          key={id}
          onSwipe={(dir) => (dir === 'left' ? handleReject(id, profileRef) : handleAccept(id, profileRef))}
          preventSwipe={['up', 'down']}
        >
          <div className="relative bg-white border-2 w-full h-full shadow-lg flex flex-col items-center justify-end p-6 rounded-md">
            <div className="w-full h-[500px] bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <img
                src={photoURL || 'https://via.placeholder.com/150'}
                className="w-full h-full object-cover rounded-md"
                alt={`Foto de ${displayName}`}
              />
            </div>

            <h2 className="text-xl font-bold text-[#333333]">{displayName}</h2>

            <div className="flex w-full justify-evenly flex-wrap mt-4">
              <button
                onClick={handleReject(id, profileRef)}
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
                onClick={handleAccept(id, profileRef)}
                className="rounded-full bg-[#00B087] w-14 h-14 flex items-center justify-center"
              >
                <Check color="white" size={30} />
              </button>
            </div>
          </div>
        </TinderCard>
      </div>
    </div>
  )
}
