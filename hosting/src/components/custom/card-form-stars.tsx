import { useState } from 'react'
import { Rating } from '@mui/material'

interface RatingProps {
  title: string
}

export default function CardFormStars({ title }: RatingProps) {
  const [value, setValue] = useState(0)
  console.log(value)

  return (
    <div className="border-[#0C408F] border-2 rounded-xl w-[652px] h-36 flex flex-col items-center px-3 py-5 justify-between">
      <p className="text-2xl">{title}</p>
      <hr className="w-full border-[#0C408F]" />
      <Rating
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue ?? 0)
        }}
        className="scale-[2]"
      />
    </div>
  )
}
