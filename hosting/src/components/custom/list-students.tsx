import { cva } from 'class-variance-authority'
import presentIcon from '@/assets/present-icon.png'
import lackIcon from '@/assets/icon-lack.png'
import notCorrectedIcon from '@/assets/not-correctedIcon.png'
import correctedIcon from '@/assets/correctedIcon.png'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

const studentCardVariants = cva('border border-[#878787] flex flex-row w-96 p-3 items-center', {
  variants: {
    variant: {
      undefined: 'bg-white',
      present: 'bg-[#badbd5]',
      lack: 'bg-[#f4c2c2]',
      corrected: 'bg-[#c9d4e5]',
      notCorrected: 'bg-[#dfdee2]',
    },
  },
  defaultVariants: {
    variant: 'undefined',
  },
})

const imageVariants = {
  undefined: '',
  present: presentIcon,
  lack: lackIcon,
  corrected: correctedIcon,
  notCorrected: notCorrectedIcon,
}

interface Props {
  name: string
  picture: string
  variant?: 'undefined' | 'present' | 'lack' | 'corrected' | 'notCorrected'
}

export default function ListStudents({ name, picture, variant, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex w-[370px]">
      <div className={cn(studentCardVariants({ variant }))}>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-10">
            <div className="flex items-center gap-10">
              <img className="w-14 h-14 rounded-full object-cover" src={picture} />
              <p className="text-[#292D32] text-xl font-medium">{name}</p>
            </div>

            {children && <div className="flex items-center">{children}</div>}
          </div>

          {variant && variant !== 'undefined' && <img className="w-10 h-10 ml-auto" src={imageVariants[variant]} />}
        </div>
      </div>
    </div>
  )
}
