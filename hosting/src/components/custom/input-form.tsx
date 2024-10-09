import { ErrorMessage, Field } from 'formik'

interface InputProps {
  title: string
  label: string
  placeholder: string
  id: string
  name: string
}

export function InputForm({ title, label, name, placeholder, id }: InputProps) {
  return (
    <label htmlFor={label} className="flex flex-col flex-1 max-w-96 mt-3">
      {title}
      <Field placeholder={placeholder} id={id} name={name} className="p-1" />
      <div className="text-red-500">
        <ErrorMessage name={name} />
      </div>
    </label>
  )
}
