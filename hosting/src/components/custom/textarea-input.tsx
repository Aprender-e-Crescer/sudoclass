import { Field } from 'formik'
import { Textarea } from '../ui/textarea'
interface InputProps {
  label: string
  placeholder?: string
  id: string
  name: string
  titleTextArea?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  customStyle?: string
}

export function InputTextarea({ label, titleTextArea, placeholder, id, name, onChange, customStyle }: InputProps) {
  return (
    <div>
      <label htmlFor={label}>{titleTextArea}</label>
      <Field
        placeholder={placeholder}
        id={id}
        name={name}
        as={Textarea}
        className={`${customStyle || ''} resize-none`}
        onChange={onChange}
      />
    </div>
  )
}
