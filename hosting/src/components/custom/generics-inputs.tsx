import { ErrorMessage, Field } from 'formik'
import { Textarea } from '@/components/ui/textarea'
interface InputProps {
  title: string
  label: string
  placeholder: string
  id: string
  name: string
  type: 'text' | 'file' | 'textarea'
  titleTextArea?: string
  customStyle?: string
}

export function InputForm({ title, label, name, placeholder, id, type, titleTextArea, customStyle }: InputProps) {
  if (type === 'text') {
    return (
      <label htmlFor={label} className="flex flex-col flex-1 max-w-96 mt-3">
        {title}
        <Field placeholder={placeholder} id={id} name={name} className={`${customStyle ? customStyle : 'p-1'}`} />
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
}
