import { Link } from '@tanstack/react-router'

interface Props {
  course: string
  index: string
  activeItem: string
  backgroundColor: string
  onClick: (name: string) => void
  to?: string
}

export function CourseItem({ course, activeItem, backgroundColor, onClick, index, to }: Props) {
  const content = (
    <div
      key={index}
      className={`w-52   h-10 gap-3 hover:cursor-pointer pl-6  hover:bg-gray-100 flex items-center rounded-lg
      ${activeItem === course ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
      onClick={() => onClick(course)}
    >
      <div className="rounded-full h-2 w-2 p-1 hidden min-[160px]:flex" style={{ backgroundColor }}></div>
      <p className="font-semibold text-[#787486] hidden min-[420px]:flex text-ellipsis overflow-hidden whitespace-nowrap w-full">
        {course}
      </p>
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}
