import { Field } from 'formik'

interface FileInputProps {
  label: string
  title: string
  id: string
  placeholder: string
  name: string
}

export function InputFile({ id, label, title, placeholder, name }: FileInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor={label}>{title}</label>
      <label htmlFor={id} className="cursor-pointer bg-white border border-gray-200 rounded w-full py-2">
        {placeholder}
      </label>
      <Field placeholder={placeholder} id={id} name={name} type="file" className="invisible" />
    </div>
  )
}
