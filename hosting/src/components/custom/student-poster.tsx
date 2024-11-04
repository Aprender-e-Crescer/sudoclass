import { useState, useEffect } from 'react';
import { Check, Undo2, X } from 'lucide-react';
import TinderCard from 'react-tinder-card';

export function StudentPoster({ students, currentIndex, onStudentUpdate, setCurrentIndex }) {
    const [swipedIndices, setSwipedIndices] = useState([]);

    const handleSwipe = (direction) => {
        if (students && currentIndex >= 0) {
            const studentId = students[currentIndex].id;

            if (direction === 'left') {
                onStudentUpdate(studentId, 'lack');
            } else if (direction === 'right') {
                onStudentUpdate(studentId, 'present');
            }

            setSwipedIndices((prev) => [...prev, currentIndex]);
            setCurrentIndex((prevIndex) => prevIndex - 1); 
        }
    };

    const handleReject = () => handleSwipe('left');
    const handleAccept = () => handleSwipe('right');

    const handleUndo = () => {
        if (swipedIndices.length > 0) {
            const lastSwipedIndex = swipedIndices[swipedIndices.length - 1];
            setSwipedIndices((prev) => prev.slice(0, -1));
            setCurrentIndex(lastSwipedIndex);
        }
    };

    if (!students || students.length === 0) {
        return <div>loading...</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative w-full max-w-[375px] h-[600px]">
                {currentIndex >= 0 && (
                    <TinderCard
                        className="absolute w-full h-full"
                        key={students[currentIndex].id}
                        onSwipe={(dir) => handleSwipe(dir)}
                        preventSwipe={['up', 'down']}
                    >
                        <div className="relative bg-white border-2 w-full h-full shadow-lg flex flex-col items-center justify-end p-6 rounded-md">
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
                                    disabled={swipedIndices.length === 0}
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
    );
}