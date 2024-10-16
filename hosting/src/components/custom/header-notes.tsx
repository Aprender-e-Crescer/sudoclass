interface Props {
    title: string
    subtitle: string
    totalNote: string
  }
   
  export function HeaderNotes({ title, subtitle, totalNote }: Props) {
    return (
          <div className="border border-[#DBDBDB] w-52 h-24 flex gap-5 flex-col items-center ">
            <div className="w-[185px] mt-2">
              <h1 className="text-[18px] flex font font-semibold text-[#0C408F]">{title}</h1>
              <p className="text-[14px] flex font-medium text-[#787486] ">{subtitle}</p>
            </div>
            <div className="w-48">
              <hr />
              <p className="text-[8px] text-[#787486] font-normal ml-1 mt-1">{totalNote}</p>
            </div>
          </div>
    )
  }