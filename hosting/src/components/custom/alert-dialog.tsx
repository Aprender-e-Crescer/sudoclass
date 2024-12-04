import {
  AlertDialog,
  AlertDialogCancel,
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
  onClick?: () => void
  width?: number
  height?: number
}

export function AlertDialogComponent({
  title,
  variantContinueButton,
  variantCancelButton,
  cancelButtonValue,
  onClick,
  width = 32,
  height = 32,
}: AlertDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
        <X className="border rounded text-red-500 mr-4 cursor-pointer" width={width} height={height} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-1 justify-between">
          <AlertDialogCancel asChild className="flex flex-1">
            <Button onClick={() => setIsOpen(false)} variant={variantCancelButton}>
              Cancelar
            </Button>
          </AlertDialogCancel>
          {variantCancelButton && (
            <Button
              variant={variantCancelButton}
              onClick={() => {
                onClick?.()
                setIsOpen(false)
              }}
            >
              {cancelButtonValue}
            </Button>
          )}
          {variantContinueButton && <Button variant={variantContinueButton}>{cancelButtonValue}</Button>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
