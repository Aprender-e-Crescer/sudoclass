import { InputWithoutLabel } from '@/components/custom/without-label-input'

interface InputProps {
  placeholder?: string
  id: string
  name: string
  icon?: JSX.Element
  avatar: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputWithAvatar({ placeholder, id, name, icon, avatar, onChange }: InputProps) {
  return (
    <>
      <div className="flex gap-3 items-center w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex">
          <img src={avatar} alt="User avatar" className="w-full h-full" />
        </div>
        <InputWithoutLabel placeholder={placeholder} id={id} name={name} icon={icon} onChange={onChange} />
      </div>
    </>
  )
}
