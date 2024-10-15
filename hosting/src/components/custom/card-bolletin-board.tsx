interface CardComponentProps {
  matter: string
  description: string
}

export function CardComponent({ matter, description }: CardComponentProps) {
  return (
    <div className="bg-[#D89022] text-white w-full max-w-[1068px] h-[258px] rounded-lg p-8 flex flex-col justify-end">
      <h1 className="text-3xl sm:text-4xl font-bold">{matter}</h1>
      <p className="text-base sm:text-lg text-gray-300">{description}</p>
    </div>
  )
}
