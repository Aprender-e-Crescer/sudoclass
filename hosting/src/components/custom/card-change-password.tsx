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
import clsx from 'clsx'

interface CardChangePasswordProps {
  name: string
  course?: string
  handleApproved?: () => void
  handleReject?: () => void
  avatarUrl: string
  variant: 'pending' | 'accepted' | 'recused'
}

export default function CardChangePassword({
  name,
  handleApproved,
  handleReject,
  avatarUrl,
  variant,
}: CardChangePasswordProps) {
  return (
    <div
      className={clsx('flex items-center justify-between w-full p-4 border rounded-lg shadow-sm', {
        'bg-white': variant === 'pending',
        'bg-green-100': variant === 'accepted',
        'bg-red-100': variant === 'recused',
      })}
    >
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
          <AlertDialogTrigger>
            <div className="p-2 flex items-center justify-center rounded-full bg-red-50">
              <X className="w-5 h-5 text-red-600" />
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
              <AlertDialogAction asChild>
                <button onClick={handleReject}>Confirmar</button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
