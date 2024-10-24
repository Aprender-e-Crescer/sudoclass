interface Props {
  title?: string
  subtitle?: string
}

export function HeaderNotes({ title, subtitle }: Props) {
  return (
    <>
    <div className="flex md:hidden">
      <div className="flex flex-col w-36 h-20 border border-[#DBDBDB] items-center justify-center gap-2">
        <h1 className="flex text-[#0C408F] font-semibold">{title}</h1>
        <p className="flex items-center text-[#787486] font-medium">{subtitle}</p>
      </div>
    </div>  

      <div className="hidden md:flex">
        <div className="border border-[#DBDBDB] w-52 h-24 flex gap-5 flex-col items-center ">
          <div className="w-[185px] mt-2">
            <h1 className="text-[18px] flex font font-semibold text-[#0C408F]">{title}</h1>
            <p className="text-[14px] flex font-medium text-[#787486] ">{subtitle}</p>
          </div>
          <div className="w-48">
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}
