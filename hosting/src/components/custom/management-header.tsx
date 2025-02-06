import { PencilLine, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { When } from 'react-if'
import { Link } from '@tanstack/react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ManagementHeaderProps {
  title: string
  Subtitle: string
  dialogTitle: string
  buttonText?: string
  buttonRedirection?: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function ManagementHeader({
  title,
  Subtitle,
  dialogTitle,
  buttonText,
  onEdit,
  onDelete,
  buttonRedirection,
}: ManagementHeaderProps) {
  return (
    <div className="border-b-2">
      <div className="flex justify-between m-6">
        <h1 className="text-4xl text-[#0D062D] font-medium">
          {title} - {Subtitle}
        </h1>
        <div className="flex items-center justify-center gap-x-5">
          <button onClick={onEdit}>
            <div className="flex items-center justify-center border border-gray-300 rounded-md p-2">
              <PencilLine className="text-[#0D062D]" />
            </div>
          </button>
          <AlertDialog>
            <AlertDialogTrigger>
              <button>
                <div className="flex items-center justify-center border border-gray-300 rounded-md p-2">
                  <Trash2 className="text-[#0D062D]" />
                </div>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  <button onClick={onDelete}>Confirmar</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <When condition={buttonText}>
            <Link to={buttonRedirection}>
              <Button variant="blueButton" size="medium" className="py-1">
                {buttonText}
              </Button>
            </Link>
          </When>
        </div>
      </div>
    </div>
  )
}
