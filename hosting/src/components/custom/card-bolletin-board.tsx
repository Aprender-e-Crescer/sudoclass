interface CardComponentProps {
  name: string
  courseName: string
  color: string
}

export function CardComponent({ name, courseName, color }: CardComponentProps) {
  return (
    <div
      className="text-white w-full max-w-[1068px] h-[258px] rounded-lg p-8 flex flex-col justify-end"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>
      <p className="text-base sm:text-lg text-gray-300">{courseName}</p>
    </div>
  )
}
