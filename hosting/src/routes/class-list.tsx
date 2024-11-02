import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Pencil, X } from 'lucide-react'
import { AlertDialogComponent } from '@/components/custom/alert-dialog'

export const Route = createFileRoute('/class-list')({
  component: ClassList,
})

export function ClassList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <div className="flex flex-col gap-10 w-full max-w-[1600px] px-4">
          <Button variant="blueButton">Cadastrar nova turma</Button>

          <div className="flex flex-col gap-7 font-bold text-blue-950 text-lg">
            <div className="flex flex-col gap-10 w-full">
              <p className="border rounded-xl p-3 flex justify-between">
                Aprender e crescer 2024
                <div className="flex">
                  <AlertDialogComponent
                    title="Deseja excluir a turma?"
                    cancelButtonValue="Excluir"
                    variantCancelButton="blueButton"
                  />
                  <Pencil className="border rounded text-zinc-500 w-8 h-8" />
                </div>
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <p className="border rounded-xl p-3 flex justify-between">
                Aprender e crescer 2023
                <div className="flex">
                  <AlertDialogComponent
                    title="Deseja excluir?"
                    cancelButtonValue="Excluir"
                    variantCancelButton="blueButton"
                  />
                  <Pencil className="border rounded text-zinc-500 w-8 h-8" />
                </div>
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <p className="border rounded-xl p-3 flex justify-between">
                Aprender e crescer 2022
                <div className="flex">
                  <AlertDialogComponent
                    title="Deseja excluir?"
                    cancelButtonValue="Excluir"
                    variantCancelButton="blueButton"
                  />
                  <Pencil className="border rounded text-zinc-500 w-8 h-8" />
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
