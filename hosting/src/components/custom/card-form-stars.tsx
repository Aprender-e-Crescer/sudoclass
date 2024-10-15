import { useState } from 'react'
import { Rating } from '@mui/material'

interface RatingProps {
  title: string
}

export function CardFormStars({ title }: RatingProps) {
  const [value, setValue] = useState(0)

  return (
    <div className="border-[#0C408F] border-2 rounded-xl w-[280px] h-auto flex flex-col items-center px-3 py-5 justify-between sm:w-[652px]">
      <p className="text-2xl mb-2 text-center">{title}</p>
      <hr className="w-full border-[#0C408F] mb-10" />
      <Rating
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue ?? 0)
        }}
        className="scale-[2] pb-2"
      />
    </div>
  )
}
