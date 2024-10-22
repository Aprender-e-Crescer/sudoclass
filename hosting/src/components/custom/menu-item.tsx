import React from 'react'
import { LucideProps } from 'lucide-react'

interface Props {
  nameItem: string
  activeItem: string
  onClick: (name: string) => void
  Icon: React.FC<LucideProps>
}

export const MenuItem: React.FC<Props> = ({ nameItem, activeItem, onClick, Icon }) => {
  return (
    <div
      className={`w-52 max-[420px]:w-11 max-[420px]:justify-center h-10 flex items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 
        ${activeItem === nameItem ? 'bg-[#5030E5] bg-opacity-10' : ''}`}
      onClick={() => onClick(nameItem)}
    >
      <div className="p-2">
        <Icon size={22} color="#787486" />
      </div>
      <p className="hidden text-[#787486] font-medium min-[420px]:flex">{nameItem}</p>
    </div>
  )
}
