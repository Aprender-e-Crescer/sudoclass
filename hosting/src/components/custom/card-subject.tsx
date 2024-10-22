import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cva } from 'class-variance-authority'
import { EllipsisVertical, MessageCircleMore } from 'lucide-react'

const cardSubjectStyle = cva(
  'w-full max-w-[384px] sm:w-[443px] h-44 sm:h-80 rounded-lg shadow-lg flex flex-col justify-between',
  {
    variants: {
      backgroundColor: {
        vermelho: 'bg-[#C14224]',
        amarelo: 'bg-[#DE9E2F]',
        azul: 'bg-[#0C408F]',
        laranja: 'bg-[#CD671F]',
        rosa: 'bg-[#D8727D]',
        ciano: 'bg-[#72D8BD]',
        verde: 'bg-[#76B556]',
        roxo: 'bg-[#955CB9]',
        marrom: 'bg-[#935D27]',
      },
    },
    defaultVariants: {
      backgroundColor: 'amarelo',
    },
  },
)

interface CardSubjectProps {
  name: string
  description: string
  backgroundColor?: 'vermelho' | 'amarelo' | 'azul' | 'laranja' | 'rosa' | 'ciano' | 'verde' | 'roxo' | 'marrom'
}

export function CardSubject({ name, description, backgroundColor }: CardSubjectProps) {
  return (
    <div className={cardSubjectStyle({ backgroundColor })}>
      <div className="flex justify-between m-6">
        <div className="flex flex-col">
          <div className="text-white font-bold text-xl mr-5 mb-1 line-clamp-2">{name}</div>
          <div className="text-white text-sm sm:text-base">{description}</div>
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
          <p className="text-white text-sm mr-4 sm:text-base">notas</p>
        </div>
      </div>
    </div>
  )
}
