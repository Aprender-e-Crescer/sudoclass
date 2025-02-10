import { QueryFilters } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface Props {
    name: string
    label: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    filtersQueryToShowLoading?: QueryFilters
    multiple?: boolean
}

export function InputFile({ name, label, placeholder, type, onChange, multiple }: Props) {
  const { setFieldValue, errors, touched } = useFormikContext()

  // @ts-expect-error
  const isTouched = !!touched[name]
  // @ts-expect-error
  const hasError = !!errors[name]
  const shouldShowError = isTouched && hasError

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    
    setFieldValue(name, event.currentTarget.files)
  }

  return (
    <div className='flex flex-col gap-y-1'>
        <label htmlFor={name} className="text-md">{label}</label>
        <div className="flex flex-1 items-center">
          <Field
            id={name}
            name={name}
            type={type}
            value={undefined}
            placeholder={placeholder}
            onChange={handleOnInputChange}
            multiple={multiple}
            data-show-error={shouldShowError}
            className="rounded-md border border-gray-300 px-3 py-2 data-[show-error=true]:border-red-300 data-[show-error=true]:bg-red-50 flex-1"
          />
        </div>
        <p className='text-red-500 text-xs'>
            <ErrorMessage name={name} />
            &#8203;
        </p>
    </div>
  )
}