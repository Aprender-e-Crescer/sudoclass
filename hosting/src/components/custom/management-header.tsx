import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

interface ManagementHeaderProps {
  title: string
  Subtitle?: string
  buttonText?: string
  buttonRedirection?: string
  onCreate?: () => void
}

export default function ManagementHeader({
  title,
  Subtitle,
  buttonText,
  onCreate,
  buttonRedirection,
}: ManagementHeaderProps) {
  return (
    <div className="border-b-2">
      <div className="flex items-center m-6">
        <div className="flex justify-between w-full mr-5">
          <h1 className="text-4xl text-[#0D062D] font-medium">
            {title} - {Subtitle}
          </h1>
          {/* <When condition={type === 'with edits'}>
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
          </When> */}
        </div>
        <Link to={buttonRedirection}>
          <Button onClick={onCreate} variant="blueButton" size="medium" className="py-1">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  )
}
