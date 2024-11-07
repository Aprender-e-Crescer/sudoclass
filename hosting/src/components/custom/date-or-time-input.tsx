import { ErrorMessage, Field } from 'formik'
import { Input } from '@/components/ui/input'

interface InputProps {
  title?: string
  label?: string
  placeholder?: string
  id: string
  name: string
  titleTextArea?: string
  customStyleLabel?: string
  customStyleButton?: string
  icon?: JSX.Element
  type: 'time' | 'date'
}

export function DateOrTimeInput({
  title,
  label,
  name,
  placeholder,
  id,
  customStyleButton,
  customStyleLabel,
  type,
}: InputProps) {
  return (
    <label htmlFor={label} className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}>
      {title}
      <Field
        placeholder={placeholder}
        id={id}
        name={name}
        className={`${customStyleButton ? customStyleButton : 'p-1 border border-gray-200 rounded-md'}`}
        as={Input}
        type={type}
      />
      <div className="text-red-500">
        <ErrorMessage name={name} />
      </div>
    </label>
  )
}
