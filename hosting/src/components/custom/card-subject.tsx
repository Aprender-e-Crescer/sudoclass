import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cva } from 'class-variance-authority'
import { EllipsisVertical } from 'lucide-react'
import { useSubjectController } from '@/controllers/subject-controller'
import { Link } from '@tanstack/react-router'

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
  id: string
  name: string
  idCourse: string
  idClass: string
  description: string
  backgroundColor?: 'vermelho' | 'amarelo' | 'azul' | 'laranja' | 'rosa' | 'ciano' | 'verde' | 'roxo' | 'marrom' | any
}

export function CardSubject({
  id,
  name,
  description,
  backgroundColor = 'amarelo',
  idClass,
  idCourse,
}: CardSubjectProps) {
  const [cardColor, setCardColor] = useState(backgroundColor)
  const { deleteSubject } = useSubjectController() // Usando o controller para deletar a matéria

  // Função para excluir a matéria
  const handleDelete = () => {
    if (window.confirm(`Deseja realmente excluir a matéria "${name}"?`)) {
      deleteSubject(Number(id)) // Exclui a matéria diretamente
    }
  }

  return (
    <Link
      to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject"
      params={{
        idCourse,
        idClass,
        idSubject: id,
      }}
    >
    <div className={cardSubjectStyle({ backgroundColor: cardColor })}>
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
            <DropdownMenuItem onClick={handleDelete}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-white w-full rounded-b-lg py-6"></div>
    </div>
    </Link>
  )
}
