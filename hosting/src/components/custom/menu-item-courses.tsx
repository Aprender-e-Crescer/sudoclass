import { Link } from '@tanstack/react-router'
import { AlertDialogComponent } from './alert-dialog'

interface Props {
  course: string
  index: number
  activeItem: string
  onClick: (name: string) => void
  to?: string
  onDelete?: (name: string) => void
}

export function CourseItem({ course, activeItem, onClick, index, to, onDelete }: Props) {
  const content = (
    <div
      key={index}
      className={`w-52   h-10 gap-3 hover:cursor-pointer pl-6  hover:bg-gray-100 flex items-center rounded-lg
      ${activeItem === course ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
      onClick={() => onClick(course)}
    >
      <div className="rounded-full h-2 w-2 p-1 bg-red-500 hidden min-[160px]:flex"></div>
      <p className="font-semibold text-[#787486] hidden min-[420px]:flex text-ellipsis overflow-hidden whitespace-nowrap w-full">
        {course}
      </p>
      {onDelete && (
        <div className="flex items-center justify-center ">
          <AlertDialogComponent
            title="Deseja excluir a turma?"
            cancelButtonValue="Excluir"
            variantCancelButton="blueButton"
            onClick={() => onDelete(course)}
            height={20}
            width={20}
          />
        </div>
      )}
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}
