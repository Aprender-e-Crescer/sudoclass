import { ErrorMessage, Field } from 'formik'
interface InputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  name: string,
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
  customStyleButton,
  customStyleLabel,
}: InputProps) {
    return (
      <label htmlFor={label} className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}>
        {title}
        <Field
          placeholder={placeholder}
          id={id}
          name={name}
          className={`${customStyleButton ? customStyleButton : 'p-1 border border-gray-200'}`}
        />
        <div className="text-red-500">
          <ErrorMessage name={name} />
        </div>
      </label>
    )
  }
