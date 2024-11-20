import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useState } from 'react'

type ButtonVariant = 'ghostWhite' | 'ghostBlack' | 'blueButton' | 'lightTextBlack' | 'lightTextRed'

interface AlertDialogProps {
  variantCancelButton?: ButtonVariant | null
  variantContinueButton?: ButtonVariant | null
  title?: string
  cancelButtonValue?: string
}

export function AlertDialogComponent({
  title,
  variantContinueButton,
  variantCancelButton,
  cancelButtonValue,
}: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
        <X className="border rounded text-red-500 mr-4 w-8 h-8 cursor-pointer" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {variantCancelButton && (
            <Button className="w-full" variant={variantCancelButton} onClick={() => setIsOpen(false)}>
              {cancelButtonValue}
            </Button>
          )}
          {variantContinueButton && (
            <Button className="w-full" variant={variantContinueButton}>
              {cancelButtonValue}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
