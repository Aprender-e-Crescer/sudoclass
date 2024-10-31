import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { Check, Undo2, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'

export function StudentPoster() {
  const { data: students } = useStudentsListQuery()
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [swipedIndices, setSwipedIndices] = useState([])

  useEffect(() => {
    if (students && students.length > 0) {
      setCurrentIndex(students.length - 1)
    }
  }, [students])

  const handleSwipe = (direction) => {
    if (students && currentIndex > 0) {
      setSwipedIndices((prev) => [...prev, currentIndex])
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }

    direction == 'left' ? console.log('Faltou:', students[currentIndex].name) : ''
    direction == 'right' ? console.log('Presente:', students[currentIndex].name) : ''
  }

  const handleReject = () => {
    if (currentIndex >= 0) {
      handleSwipe('left')
      console.log('Faltou:', students[currentIndex].name)
    }
  }

  const handleAccept = () => {
    if (currentIndex >= 0) {
      handleSwipe('right')
      console.log('Presente:', students[currentIndex].name)
    }
  }

  const handleUndo = () => {
    if (swipedIndices.length > 0) {
      const lastSwipedIndex = swipedIndices[swipedIndices.length - 1]
      setSwipedIndices((prev) => prev.slice(0, -1))
      setCurrentIndex(lastSwipedIndex)
    }
  }

  if (!students) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full max-w-[375px] h-[600px]">
        {currentIndex >= 0 && (
          <TinderCard
            className="absolute w-full h-full"
            key={students[currentIndex].name}
            onSwipe={(dir) => handleSwipe(dir)}
            preventSwipe={['up', 'down']}
          >
            <div className="relative bg-white w-full h-full shadow-lg flex flex-col items-center justify-end p-6 rounded-md">
              <div className="w-full h-[480px] overflow-hidden rounded-lg">
                {/* Imagem do estudante (descomentada caso tenha imagem) */}
                {/* <img
                  src={students[currentIndex].imgStudent}
                  alt={students[currentIndex].nameStudent}
                  className="h-full w-full object-cover bg-[#d9d9d9] translate-y-[-20px]"
                /> */}
              </div>
              <h2 className="text-xl font-bold text-[#333333]">{students[currentIndex].name}</h2>
              <div className="flex w-full justify-evenly flex-wrap mt-4">
                <button
                  onClick={handleReject}
                  className="rounded-full bg-[#DF0404] w-14 h-14 flex items-center justify-center md:w-16 md:h-16"
                >
                  <X color="white" size={30} strokeWidth={4} />
                </button>

                <button
                  onClick={handleUndo}
                  disabled={swipedIndices.length === 0}
                  className="rounded-full bg-[#0C408FCC] w-14 h-14 flex items-center justify-center md:w-16 md:h-16 disabled:bg-gray-400"
                >
                  <Undo2 color="white" size={30} strokeWidth={4} />
                </button>

                <button
                  onClick={handleAccept}
                  className="rounded-full bg-[#00B087] w-14 h-14 flex items-center justify-center md:w-16 md:h-16"
                >
                  <Check color="white" size={30} strokeWidth={4} />
                </button>
              </div>
            </div>
          </TinderCard>
        )}
        {currentIndex < 0 && (
          <div className="text-center text-lg text-gray-700">Todos os estudantes foram avaliados!</div>
        )}
      </div>
    </div>
  )
}
