import { Field } from 'formik'
import { Textarea } from '../ui/textarea'

interface InputProps {
  label: string
  placeholder?: string
  id: string
  name: string
  titleTextArea?: string
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputTextarea({ label, titleTextArea, placeholder, id, name, onChange, isDisabled }: InputProps) {
  return (
    <div>
      <label htmlFor={label}>{titleTextArea}</label>
      <Field
        placeholder={placeholder}
        id={id}
        name={name}
        as={Textarea}
        className="resize-none"
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  )
}
