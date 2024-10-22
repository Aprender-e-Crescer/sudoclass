interface Props {
  course: string
  index: number
  activeItem: string
  onClick: (name: string) => void
}

export function CourseItem({ course, activeItem, onClick, index }: Props): JSX.Element {
  return (
    <div
      key={index}
      className={`w-52 h-10 gap-3 hover:cursor-pointer pl-6 hover:bg-gray-100 flex items-center rounded-lg 
      ${activeItem === course ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
      onClick={() => onClick(course)}
    >
      <div className="rounded-full h-2 w-2 bg-red-500 hidden min-[160px]:flex"></div>
      <p className="font-semibold text-[#787486] hidden min-[420px]:flex">{course}</p>
    </div>
  )
}
