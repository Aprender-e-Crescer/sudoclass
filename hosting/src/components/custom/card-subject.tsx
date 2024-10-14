export function CardSubject() {
  return (
    <div className="w-full max-w-[384px] sm:w-[443px] h-44 sm:h-80 bg-[#DE9E2F] rounded-lg shadow-lg flex flex-col justify-between">
      <div className="flex flex-col m-4">
        <div className="text-white font-bold text-xl">Matéria</div>
        <div className="text-black text-sm sm:text-base">descrição</div>
      </div>
      <div className="bg-white w-full rounded-b-lg flex items-center justify-end p-2">
        <p className="text-black text-sm sm:text-base">notas</p>
      </div>
    </div>
  )
}
