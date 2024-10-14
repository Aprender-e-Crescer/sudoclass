import presentIcon from '@/assets/present-icon.png'
import lackIcon from '@/assets/icon-lack.png'
import notCorrectedIcon from '@/assets/not-correctedIcon.png'
import correctedIcon from '@/assets/correctedIcon.png'

interface Props {
  name: string
  picture: string
  children?: React.ReactNode
}

type ListStudentsProps = {
  variant?: 'undefined' | 'present' | 'lack' | 'corrected' | 'notCorrected'
}

export default function ListStudents({ name, picture, variant, children }: Props & ListStudentsProps) {
  const backgroundVariants = {
    undefined: 'bg-white',
    present: 'bg-[#badbd5]',
    lack: 'bg-[#f4c2c2]',
    corrected: 'bg-[#c9d4e5]',
    notCorrected: 'bg-[#dfdee2]',
  }

  const imageVariants = {
    undefined: '',
    present: presentIcon,
    lack: lackIcon,
    corrected: correctedIcon,
    notCorrected: notCorrectedIcon,
  }

  return (
    <div
      className={`border border-[#878787] flex flex-row w-96 p-3 items-center ${backgroundVariants[variant || 'undefined']}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-10">
          <img className="w-14 h-14 rounded-full object-cover" src={picture} />
          <p className="text-[#292D32] text-xl font-medium">{name}</p>

          {children && <div className="flex">{children}</div>}
        </div>
        {variant && variant !== 'undefined' && <img className="w-10 h-10 ml-auto" src={imageVariants[variant]} />}
      </div>
    </div>
  )
}
