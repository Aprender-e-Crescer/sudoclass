interface formCreatedProps {
  nameForm: string
  nameCreator: string
  createdIn: string
}

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'

export function FormCreated({ nameForm, nameCreator, createdIn }: formCreatedProps) {
  return (
    <>
      <div className="w-[850px] justify-between border flex items-center h-16 rounded-xl">
        <div className="flex w-[510px] justify-between pl-4">
          <p>{nameForm}</p>
          <p>{nameCreator}</p>
          <p>{createdIn}</p>
        </div>
        <div className="flex gap-6 max-[420px]:flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis className="mr-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <label className="flex gap-3 items-center justify-center font-medium w-full cursor-pointer">
                  Editar
                  <Pencil className="h-4 w-4 font-semibold" />
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <label className="flex gap-3 items-center justify-center text-red-500 font-medium w-full cursor-pointer">
                  Apagar
                  <Trash2 className="h-4 w-4 font-semibold" />
                </label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
