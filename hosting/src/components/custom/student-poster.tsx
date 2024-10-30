import { Check, Undo2, X } from 'lucide-react';
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const students = [
  { nameStudent: 'John Doe', imgStudent: 'profile1.jpg' },
  { nameStudent: 'Jane Smith', imgStudent: 'profile2.jpg' },
  { nameStudent: 'Michael Johnson', imgStudent: 'profile3.jpg' },
];

export function StudentPoster() {
  const [currentIndex, setCurrentIndex] = useState(students.length - 1);
  const [swiped, setSwiped] = useState(false);

  const handleSwipe = (direction, nameToDelete) => {
    console.log('removing:', nameToDelete);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setSwiped(true);
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  const handleUndo = () => {
    setSwiped(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-full max-w-[375px] h-[600px]">
        {students.map((student, index) => (
          <TinderCard
            className="absolute w-full h-full"
            key={student.nameStudent}
            onSwipe={(dir) => handleSwipe(dir, student.nameStudent)}
            onCardLeftScreen={() => outOfFrame(student.nameStudent)}
            preventSwipe={['up', 'down']}
          >
            <div className="relative bg-white w-full h-full shadow-lg flex flex-col items-center justify-end p-6">
              <div className="w-full h-[480px] overflow-hidden rounded-lg">
                <img
                  src={student.imgStudent}
                  alt={student.nameStudent} 
                  className="h-full w-full object-cover bg-[#d9d9d9] translate-y-[-20px]" 
                />
              </div>
              <h2 className="text-xl font-bold text-[#333333]">{student.nameStudent}</h2>
              <div className="flex w-full justify-evenly flex-wrap mt-4">
                <button className="rounded-full bg-[#DF0404] w-14 h-14 flex items-center justify-center md:w-16 md:h-16">
                  <X color="white" size={30} strokeWidth={4} />
                </button>

                <button onClick={handleUndo} className="rounded-full bg-[#0C408FCC] w-14 h-14 flex items-center justify-center md:w-16 md:h-16">
                  <Undo2 color="white" size={30} strokeWidth={4} />
                </button>

                <button className="rounded-full bg-[#00B087] w-14 h-14 flex items-center justify-center md:w-16 md:h-16">
                  <Check color="white" size={30} strokeWidth={4} />
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
