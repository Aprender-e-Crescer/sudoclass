interface CardComponentProps {
  materia: string
  descricao: string
}

export function CardComponent({ materia, descricao }: CardComponentProps) {
  return (
    <div className="bg-[#D89022] text-white w-full max-w-[1068px] h-[258px] rounded-lg p-8 flex flex-col justify-end">
      <h1 className="text-3xl sm:text-4xl font-bold">{materia}</h1>
      <p className="text-base sm:text-lg text-gray-300">{descricao}</p>
    </div>
  )
}
9
