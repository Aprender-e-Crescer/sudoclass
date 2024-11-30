import { ErrorMessage, Field, useFormikContext } from 'formik'
interface InputProps {
  title?: string
  label: string
  placeholder?: string
  id: string
  value?: string
  name: string
  titleTextArea?: string
  customStyleLabel?: string
  customStyleInput?: string
  icon?: JSX.Element
  type?: 'text' | 'date'
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
  customStyleInput,
  customStyleLabel,
  isDisabled,
  onChange,
  value,
}: InputProps) {
  const { setFieldValue } = useFormikContext()

  return (
    <label htmlFor={label} className={`${customStyleLabel ? customStyleLabel : 'flex flex-col flex-1 w-full mt-3'}`}>
      {title}
      <Field
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        type={type}
        disabled={isDisabled}
        className={`${customStyleInput ? customStyleInput : 'p-1 border border-gray-200  rounded-md'}
        ${isDisabled ? 'cursor-not-allowed' : ''}`}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(event)
          setFieldValue(name, event.target.value)
        }}
      />
      <div className="text-red-500">
        &nbsp;
        <ErrorMessage name={name} />
      </div>
    </label>
  )
}
