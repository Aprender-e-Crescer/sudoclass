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
import { useState } from 'react'
import { When } from 'react-if'

interface CardManagementProps {
  name: string
  confirmationTitle: string
  type: 'course' | 'class'
  color: string
  startDate?: string
  endDate?: string
  shift?: string
  onEdit?: () => void
  onDelete?: () => void
}

export default function CardManagement({
  name,
  confirmationTitle,
  type,
  color,
  startDate,
  endDate,
  shift,
  onEdit,
  onDelete,
}: CardManagementProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="bg-white rounded-lg shadow border-l-4 w-full" style={{ borderColor: color }}>
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <h2 className="text-2xl sm:text-4xl text-[#0D062D] font-semibold">{name}</h2>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onEdit?.()
                }}
                className="flex items-center justify-center border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                aria-label="Editar"
              >
                <PencilLine className="text-[#0D062D] w-5 h-5" />
              </button>
              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(true)
                  }}
                  className="flex items-center justify-center border border-gray-300 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  aria-label="Excluir"
                >
                  <Trash2 className="text-[#0D062D] w-5 h-5" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{confirmationTitle}</AlertDialogTitle>
                    <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(false)
                      }}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(false)
                        onDelete?.()
                      }}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <When condition={type === 'class'}>
            <div className="hidden sm:flex flex-wrap gap-6 text-lg text-[#71747B] font-medium">
              <div className="flex flex-col md:flex-row gap-2">
                <span>Início:</span>
                <span className="font-normal text-gray-600">{startDate || '-'}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span>Conclusão:</span>
                <span className="font-normal text-gray-600">{endDate || '-'}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <span>Turno:</span>
                <span className="font-normal text-gray-600">{shift || '-'}</span>
              </div>
            </div>
          </When>
        </div>
      </div>
    </div>
  )
}
