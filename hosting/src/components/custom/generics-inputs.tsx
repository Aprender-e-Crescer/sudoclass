import { ErrorMessage, Field } from 'formik'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
interface InputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  name: string
  type: 'text' | 'file' | 'textarea' | 'onlyInput' | 'checkbox'
  titleTextArea?: string
  customStyleLabel?: string
  customStyleButton?: string
  icon?: JSX.Element
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
}: InputProps) {
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

  const vetorTeste = [
    {
      test1: 'Sim',
    },
    {
      test2: 'Não',
    },
  ]

  if (type === 'checkbox') {
    return (
      <>
        {vetorTeste.map(({ test1, test2 }) => (
          <div className="flex items-center space-x-2 mt-2" key={name}>
            <Checkbox id={id} />
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
}
