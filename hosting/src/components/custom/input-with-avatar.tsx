import { InputWithoutLabel } from '@/components/custom/without-label-input'
import * as Avatar from '@radix-ui/react-avatar'

interface InputProps {
  placeholder?: string
  id: string
  name: string
  icon?: JSX.Element
  avatar: string | ArrayBuffer
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputWithAvatar({ placeholder, id, name, icon, avatar, onChange }: InputProps) {
  return (
    <>
      <div className="flex gap-3 items-center w-full bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex">
          <Avatar.Root className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Avatar.Image className="w-full h-full rounded-full object-cover" src={avatar} />
          </Avatar.Root>
        </div>
        <InputWithoutLabel placeholder={placeholder} id={id} name={name} icon={icon} onChange={onChange} />
      </div>
    </>
  )
}
