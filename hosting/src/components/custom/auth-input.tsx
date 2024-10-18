import { ErrorMessage, Field } from 'formik'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface AuthInputProps {
  id: string
  name: string
  placeholder: string
  icon: JSX.Element
  isPasswordInput?: boolean
}

export function InputAuth({ id, name, placeholder, icon, isPasswordInput }: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleOnToggleIconClick = () => {
    setIsPasswordVisible((oldIsPasswordVisible) => !oldIsPasswordVisible)
  }

  const EyeIcon = isPasswordVisible ? Eye : EyeOff
  const typePassword = 'password'
  const newType = isPasswordVisible || !isPasswordInput ? 'string' : typePassword

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-500">{icon}</div>
        <Field
          id={id}
          name={name}
          as={Input}
          type={newType}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-[#2F2F2F]"
        />
        <div className={`${isPasswordInput ? 'flex' : 'hidden'} absolute inset-y-0 right-0 pr-3 items-center`}>
          <button
            onClick={handleOnToggleIconClick}
            type="button"
            data-is-password={typePassword == 'password'}
            className="hidden data-[is-password=true]:block"
          >
            <EyeIcon className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </div>
      <div className="text-red-500 flex p-2">
        &nbsp;
        <ErrorMessage name={name} />
      </div>
    </>
  )
}
