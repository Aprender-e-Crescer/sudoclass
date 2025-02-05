import { PencilLine, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { When } from 'react-if'

interface ManagementHeaderProps {
  title: string
  buttonText?: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function ManagementHeader({ title, buttonText, onEdit, onDelete }: ManagementHeaderProps) {
  return (
    <div className="flex justify-between m-6">
      <h1 className="text-4xl text-[#0D062D] font-medium">{title}</h1>
      <div className="flex items-center justify-center gap-x-5">
        <button onClick={onEdit}>
          <div className="flex items-center justify-center border border-gray-300 rounded-md p-2">
            <PencilLine className="text-[#0D062D]" />
          </div>
        </button>
        <button onClick={onDelete}>
          <div className="flex items-center justify-center border border-gray-300 rounded-md p-2">
            <Trash2 className="text-[#0D062D]" />
          </div>
        </button>
        <When condition={buttonText}>
          <Button variant="blueButton" size="medium" className="py-1">
            {buttonText}
          </Button>
        </When>
      </div>
    </div>
  )
}
