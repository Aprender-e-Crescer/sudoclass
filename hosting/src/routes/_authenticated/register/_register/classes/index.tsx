import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { AlertDialogComponent } from '@/components/custom/alert-dialog'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/register/_register/classes/')({
  component: ClassList,
})

export function ClassList() {
  return (
    <div className="w-full px-4 flex justify-center flex-col gap-6 mt-5">
      <Link to="/register/classes/manage" search={{ action: 'create' }}>
        <Button variant="blueButton" size="medium">
          Cadastrar nova turma
        </Button>
      </Link>

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
              <Link to="/register/classes/manage" search={{ action: 'edit' }}>
                <Pencil className="border rounded text-zinc-500 w-8 h-8" />
              </Link>
            </div>
          </p>
        </div>
      </div>
    </div>
  )
}
