import { ErrorMessage, Field } from 'formik'
interface InputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  name: string
  titleTextArea?: string
  customStyleLabel?: string
  customStyleButton?: string
  icon?: JSX.Element
  type?: string
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputForm({
  title,
  type,
  label,
  name,
  placeholder,
  id,
  customStyleButton,
  customStyleLabel,
  isDisabled,
  onChange,
}: InputProps) {
  return (
    <label htmlFor={label} className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}>
      {title}
      <Field
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
        disabled={isDisabled}
        className={`${customStyleButton ? customStyleButton : 'p-1 border border-gray-200  rounded-md'}
        ${isDisabled ? 'cursor-not-allowed' : ''}`}
        onChange={onChange}
      />
      <div className="text-red-500">
        &nbsp;
        <ErrorMessage name={name} />
      </div>
    </label>
  )
}
