import { formatWithMask } from "@/utils/formatWithMask";
import { Mask } from "@/utils/formatWithMask.types";
import { QueryFilters, useIsFetching } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Loader2 } from "lucide-react";

interface Props {
    name: string
    label: string
    placeholder?: string
    type: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    mask?: Mask
    filtersQueryToShowLoading?: QueryFilters
}

export function Input({ name, label, placeholder, type, mask, onChange, filtersQueryToShowLoading }: Props) {
  const { setFieldValue, errors, touched } = useFormikContext()

  const isLoading = useIsFetching(filtersQueryToShowLoading) > 0

  // @ts-expect-error
  const isTouched = !!touched[name]
  // @ts-expect-error
  const hasError = !!errors[name]
  const shouldShowError = isTouched && hasError

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
      
    const { masked } = formatWithMask({
      text: event.target.value,
      mask: mask,
    });

    setFieldValue(name, masked)
  }

  return (
    <div className='flex flex-col gap-y-1'>
        <label htmlFor={name} className="text-md">{label}</label>
        <div className="flex flex-1 items-center">
          <Field
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleOnInputChange}
            data-show-error={shouldShowError}
            data-is-loading={isLoading}
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