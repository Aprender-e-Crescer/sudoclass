import { ErrorMessage, Field } from 'formik'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
interface InputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  name: string
  type: 'text' | 'file' | 'textarea' | 'onlyInput' | 'checkbox' | 'blueDetails'
  titleTextArea?: string
  customStyleLabel?: string
  customStyleButton?: string
  icon?: JSX.Element
  showEyeIcon?: boolean
}

export function InputForm({
  title,
  label,
  name,
  placeholder,
  id,
  type,
  titleTextArea,
  customStyleButton,
  customStyleLabel,
  icon,
  showEyeIcon,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleOnToggleIconClick = () => {
    setIsPasswordVisible((oldIsPasswordVisible) => !oldIsPasswordVisible)
  }

  const EyeIcon = isPasswordVisible ? Eye : EyeOff
  const typePassword = 'password'
  const newType = isPasswordVisible ? 'string' : typePassword

  if (type === 'text') {
    return (
      <label htmlFor={label} className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}>
        {title}
        <Field
          placeholder={placeholder}
          id={id}
          name={name}
          className={`${customStyleButton ? customStyleButton : 'p-1'}`}
        />
        <div className="text-red-500">
          <ErrorMessage name={name} />
        </div>
      </label>
    )
  }

  if (type === 'file') {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor={label}>{title}</label>
        <label htmlFor={id} className="cursor-pointer bg-white border border-gray-200 rounded w-60 py-2">
          {placeholder}
        </label>
        <Field placeholder={placeholder} id={id} name={name} type="file" className="invisible" />
      </div>
    )
  }

  if (type === 'textarea') {
    return (
      <div>
        <label htmlFor={label}>{titleTextArea}</label>
        <Field placeholder={placeholder} id={id} name={name} as={Textarea} className="resize-none" />
      </div>
    )
  }

  if (type === 'onlyInput') {
    return (
      <div className="relative w-full">
        <Field placeholder={placeholder} id={id} name={name} className="w-full pr-10" />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">{icon}</span>
      </div>
    )
  }

  const checkboxValuesExample = [
    {
      test1: 'Sim',
      label: 'test1',
    },
  ] // criar para a checkbox

  if (type === 'checkbox') {
    return (
      <>
        {checkboxValuesExample.map(({ test1, label }, index) => (
          <div className="flex items-center space-x-2 mt-2" key={index}>
            <Checkbox id={label} name={label} />
            <label
              htmlFor={label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {test1}
            </label>
          </div>
        ))}
      </>
    )
  }

  if (type === 'blueDetails') {
    return (
      <div className="p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>
          <Field
            id={id}
            name={name}
            as={Input}
            type={newType}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-[#2F2F2F]"
          />
          {showEyeIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={handleOnToggleIconClick}
                type="button"
                data-is-password={typePassword == 'password'}
                className="hidden data-[is-password=true]:block"
              >
                <EyeIcon className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
