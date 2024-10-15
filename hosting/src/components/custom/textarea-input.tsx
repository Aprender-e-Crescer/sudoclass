import { Field } from 'formik'
import { Textarea } from '../ui/textarea'

interface InputProps {
  label: string
  placeholder?: string
  id: string
  name: string
  titleTextArea?: string
}

export function InputTextarea({ label, titleTextArea, placeholder, id, name }: InputProps) {
  return (
    <div>
      <label htmlFor={label}>{titleTextArea}</label>
      <Field placeholder={placeholder} id={id} name={name} as={Textarea} className="resize-none" />
    </div>
  )
}
