import { formatWithMask } from "@/utils/formatWithMask";
import { Mask } from "@/utils/formatWithMask.types";
import { QueryFilters, useIsFetching } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Loader2 } from "lucide-react";
import { HTMLInputTypeAttribute, useLayoutEffect } from "react";

interface Props {
    name: string
    label: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    mask?: Mask
    filtersQueryToShowLoading?: QueryFilters | ((value: string, values: Record<string, string>) => QueryFilters)
    disabled?: boolean | ((value: string, values: Record<string, string>) => boolean)
}

const defaultFilter: QueryFilters = {
  predicate: () => false,
}

export function Input({ name, label, placeholder, type, mask, disabled, onChange, filtersQueryToShowLoading = defaultFilter }: Props) {
  const { setFieldValue, errors, touched, values } = useFormikContext<Record<string, string>>()

  const currentValue = (values as Record<string, string>)[name]

  const isLoading = useIsFetching(typeof filtersQueryToShowLoading === 'function' ? filtersQueryToShowLoading(currentValue, values) : filtersQueryToShowLoading) > 0
  const isTouched = !!touched[name]
  const hasError = !!errors[name]
  const shouldShowError = isTouched && hasError

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    
    setFieldValue(name, event.currentTarget.value)
  }

  useLayoutEffect(() => {
    const { masked } = formatWithMask({
      text: currentValue,
      mask: mask,
    });

    setFieldValue(name, masked)
  }, [name, mask, currentValue])

  return (
    <div className='flex flex-col flex-1 gap-y-1'>
        <label htmlFor={name} className="text-md">{label}</label>
        <div className="flex flex-1 items-center">
          <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleOnInputChange}
            data-show-error={shouldShowError}
            disabled={typeof disabled === 'function' ? disabled(currentValue, values) : disabled}
            className="rounded-md border border-gray-300 px-3 py-2 data-[show-error=true]:border-red-300 data-[show-error=true]:bg-red-50 flex-1"
          />
          <Loader2 className='hidden data-[is-loading=true]:block w-6 h-6 -ml-8 mr-2 animate-spin text-blue-500' data-is-loading={isLoading} />
        </div>
        <p className='text-red-500 text-xs'>
            <ErrorMessage name={name} />
            &#8203;
        </p>
    </div>
  )
}