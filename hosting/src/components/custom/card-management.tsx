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
import { PencilLine, Trash2 } from 'lucide-react'

interface CardManagementProps {
  name: string
  confirmationTitle: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function CardManagement({ name, confirmationTitle, onEdit, onDelete }: CardManagementProps) {
  return (
    <div className="border-2 rounded-lg">
      <div className="flex justify-between m-10">
        <h1 className="text-2xl sm:text-4xl text-[#0D062D] font-semibold">{name}</h1>
        <div className="flex gap-x-5">
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
                <AlertDialogTitle>{confirmationTitle}</AlertDialogTitle>
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
        </div>
      </div>
    </div>
  )
}
