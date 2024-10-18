import { createFileRoute } from '@tanstack/react-router'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/confirmation-screen')({
  component: ConfirmationScreen,
})

export function ConfirmationScreen() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="font-semibold text-5xl text-red-700">x</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você Deseja Exluir Esse Plano de Aula?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="lightTextBlack">Cancel</Button>
          <Button variant="blueButton">Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
