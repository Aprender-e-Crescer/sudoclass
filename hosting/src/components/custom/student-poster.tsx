import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Check, Undo2, X } from 'lucide-react';

interface PosterStudentProps {
  nameStudent: string;
  imgStudent: string;
}

export function StudentPoster({ nameStudent, imgStudent }: PosterStudentProps) {
  const [swiped, setSwiped] = useState(false);
  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    config: { friction: 50, tension: 500 },
  }));

  const bind = useDrag(({ movement: [mx], velocity, direction: [xDir], down }) => {
    if (!down && velocity > 0.2) {
      const swipeDirection = xDir > 0 ? 1 : -1;
      setSwiped(true);
      api.start({ x: swipeDirection * 2000, rot: swipeDirection * 45, scale: 1 });
    } else if (!swiped) {
      api.start({ x: down ? mx : 0, rot: down ? mx / 100 : 0, scale: down ? 1.05 : 1 });
    }
  });

  const handleUndo = () => {
    setSwiped(false);
    api.start({ x: 0, rot: 0, scale: 1 });
  };

  return (
    <div className="flex justify-center items-center">
      {!swiped ? (
        <animated.div
          {...bind()}
          style={{
            x,
            rotateZ: rot,
            scale,
            touchAction: 'none',
          }}
          className="h-[600px] max-w-[375px] w-full bg-white shadow-xl rounded-lg flex flex-col justify-center items-center px-4 py-6 gap-4"
        >
          <div className="w-full h-[420px] sm:h-[600px] bg-slate-400 overflow-hidden rounded-lg">
            <img src={imgStudent} className="h-full w-full object-cover" alt={nameStudent} />
          </div>

          <p className="flex justify-start w-full text-lg sm:text-xl mb-4">{nameStudent}</p>
          <div className="flex w-full justify-evenly flex-wrap">
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
        </animated.div>
      ) : (
        <button onClick={handleUndo} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Voltar
        </button>
      )}
    </div>
  );
}
