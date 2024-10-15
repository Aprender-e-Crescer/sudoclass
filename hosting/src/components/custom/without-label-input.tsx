import { Field } from 'formik'

interface InputProps {
  placeholder?: string
  id: string
  name: string
  icon?: JSX.Element
}

export function WithoutLabelInput({ placeholder, id, icon, name }: InputProps) {
  return (
    <div className="relative w-full">
      <Field placeholder={placeholder} id={id} name={name} className="w-full pr-10" />
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">{icon}</span>
    </div>
  )
}
