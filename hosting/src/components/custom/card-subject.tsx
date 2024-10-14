import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical, MessageCircleMore } from 'lucide-react'

export function CardSubject() {
  return (
    <div className="w-full max-w-[384px] sm:w-[443px] h-44 sm:h-80 bg-[#DE9E2F] rounded-lg shadow-lg flex flex-col justify-between">
      <div className="flex justify-between m-6">
        <div className="flex flex-col">
          <div className="text-white font-bold text-xl">Matéria</div>
          <div className="text-black text-sm sm:text-base">descrição</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Fixar Matéria</DropdownMenuItem>
            <DropdownMenuItem>Editar Cor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-white w-full rounded-b-lg flex items-center justify-end py-3">
        <div className="flex gap-x-2">
          <MessageCircleMore />
          <p className="text-black text-sm mr-4 sm:text-base">notas</p>
        </div>
      </div>
    </div>
  )
}
