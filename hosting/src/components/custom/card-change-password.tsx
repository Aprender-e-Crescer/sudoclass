import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Check, X } from 'lucide-react'
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

interface CardChangePasswordProps {
  name: string
  course?: string
  handleApproved?: () => void
  handleReject?: () => void
  avatarUrl: string
}

export default function CardChangePassword({ name, handleApproved, handleReject, avatarUrl }: CardChangePasswordProps) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={`${name} foto de perfil`} />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="p-2 flex items-center justify-center rounded-full bg-green-50">
          <button onClick={handleApproved}>
            <Check className="w-5 h-5 text-green-600" />
          </button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="p-2 flex items-center justify-center rounded-full bg-red-50">
              <button onClick={handleReject}>
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja rejeitar a troca de senha?</AlertDialogTitle>
              <AlertDialogDescription>
                A solicitação será descartada e o aluno não poderá acessar a conta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
