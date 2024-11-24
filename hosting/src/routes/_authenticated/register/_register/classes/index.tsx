import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { AlertDialogComponent } from '@/components/custom/alert-dialog'
import { Link } from '@tanstack/react-router'
import { useListClassQuery } from '@/queries/use-class-list-query'

export const Route = createFileRoute('/_authenticated/register/_register/classes/')({
  component: ClassList,
})

export function ClassList() {
  const { data: classes } = useListClassQuery()

  return (
    <div className="w-full px-4 flex justify-center flex-col gap-6 mt-5">
      <Link to="/register/classes/manage" search={{ action: 'create' }}>
        <Button variant="blueButton" size="medium">
          Cadastrar nova turma
        </Button>
      </Link>

      <div className="flex flex-col gap-7 font-bold text-blue-950 text-lg">
        <div className="flex flex-col gap-7 font-bold text-blue-950 text-lg">
          {classes?.map((classItem, index) => (
            <div key={index} className="flex flex-col gap-10 w-full">
              <p className="border rounded-xl p-3 flex justify-between">
                {classItem.name}
                <div className="flex gap-2">
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
          ))}
        </div>
      </div>
    </div>
  )
}
