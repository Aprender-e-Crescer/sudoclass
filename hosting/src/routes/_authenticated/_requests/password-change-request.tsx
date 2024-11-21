import { createFileRoute } from '@tanstack/react-router'
import { Copy, ChevronLeft } from 'lucide-react'
import { X } from 'lucide-react'
import { Check } from 'lucide-react'
import avatarLogo from '@/assets/avatarLogo.svg'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { useToast } from '@/hooks/use-toast'

export const Route = createFileRoute('/_authenticated/_requests/password-change-request')({
  component: RequestChangePassword,
})

export function RequestChangePassword() {
  const { data: students } = useStudentsListQuery()
  const { toast } = useToast()

  return (
    <>
      {students?.map(({ name }, index) => (
        <div key={index} className="flex flex-col flex-1 p-2">
          <div className="rounded-md border-2 flex p-3 items-center my-5 gap-5">
            <img className="size-12" src={avatarLogo} />
            <div>
              <h1 className="font-bold font-[inter]">{name}</h1>
              <p className="text-gray-300 font-[inter]">Curso: Aprender e crescer</p>
            </div>
            <div className="gap-3 flex ml-auto">
              <AlertDialog>
                <AlertDialogTrigger>
                  <div
                    onClick={() =>
                      toast({
                        duration: 1500,
                        variant: 'sucesss',
                        title: 'Atualizado com sucesso ✓',
                      })
                    }
                  >
                    <div className="flex border h-8 rounded-md justify-center items-center p-1">
                      <Check className="text-green-500" />
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-9  h-56 w-full">
                  <AlertDialogHeader className="flex text-start flex-row gap-3">
                    <AlertDialogCancel className="w-10">
                      <ChevronLeft className="size-8 mt-[13px]" />
                    </AlertDialogCancel>
                    <AlertDialogTitle className="text-2xl">Nova senha - {name}</AlertDialogTitle>
                  </AlertDialogHeader>
                  <Button
                    iconPosition="right"
                    variant="ghostBlack"
                    icon={<Copy />}
                    className="w-full p-6 text-xl border-2 border-black"
                  >
                    {name} {/* Mudar para senha mais tarde, tem que mudar na querie do estudante*/}
                  </Button>
                </AlertDialogContent>
              </AlertDialog>
              <div className="flex border h-8 rounded-md justify-center items-center p-1 ">
                <X className="text-red-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
