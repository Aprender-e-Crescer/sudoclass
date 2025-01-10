import { cva } from 'class-variance-authority'
import { Link } from '@tanstack/react-router'

const cardSubjectStyle = cva('w-[200px] md:w-[400px] h-[200px] rounded-lg shadow-lg flex flex-col justify-between', {
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
})

interface CardColorProps {
  name: string
  idCourse: string
  idClass: string
}

export function CardColor({ name, idClass, idCourse }: CardColorProps) {
  const colors = ['vermelho', 'amarelo', 'azul', 'laranja', 'rosa', 'ciano', 'verde', 'roxo', 'marrom']

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const cardColor = getRandomColor()

  return (
    <Link to={`/courses/${idCourse}/classes/${idClass}/subjects`}>
      <div className={cardSubjectStyle({ backgroundColor: cardColor })}>
        <div className="flex justify-between m-6">
          <div className="flex flex-col">
            <div className="text-white font-bold text-xl mr-5 mb-1 line-clamp-2">{name}</div>
          </div>
        </div>
        <div className="bg-white w-full rounded-b-lg py-6"></div>
      </div>
    </Link>
  )
}
