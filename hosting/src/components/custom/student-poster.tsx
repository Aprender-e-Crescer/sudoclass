import { Check, Undo2, X } from 'lucide-react'

interface PosterStudentProps {
  nameStudent: string
  imgStudent: string
}

export function StudentPoster({ nameStudent, imgStudent }: PosterStudentProps) {
  return (
    <div className="h-auto max-w-sm sm:max-w-md bg-white shadow-xl rounded-lg flex flex-col  justify-center items-center px-4 py-6 gap-4">
      <div className="w-full h-[490px] bg-slate-400 overflow-hidden rounded-lg">
        <img src={imgStudent} className="h-full w-full object-cover" />
      </div>

      <p className="flex justify-start w-full text-xl sm:text-2xl mb-4">{nameStudent}</p>
      <div className="flex w-full justify-evenly flex-wrap">
        <button className="rounded-full bg-[#DF0404] w-16 h-16 flex items-center justify-center md:w-20 md:h-20">
          <X color="white" size={40} strokeWidth={4} />
        </button>

        <button className="rounded-full bg-[#0C408FCC] w-16 h-16 flex items-center justify-center md:w-20 md:h-20">
          <Undo2 color="white" size={40} strokeWidth={4} />
        </button>

        <button className="rounded-full bg-[#00B087] w-16 h-16 flex items-center justify-center md:w-20 md:h-20">
          <Check color="white" size={40} strokeWidth={4} />
        </button>
      </div>
    </div>
  )
}
