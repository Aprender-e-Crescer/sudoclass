import { QueryFilters, useIsFetching } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { CircleXIcon, Download, Loader2, PlusIcon } from "lucide-react";
import { HTMLInputTypeAttribute } from "react";
import prettyBytes from 'pretty-bytes';

interface Props {
    name: string
    label: string
    placeholder?: string
    type?: HTMLInputTypeAttribute
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    filtersQueryToShowLoading?: QueryFilters
    multiple?: boolean
}

export function InputFile({ name, label, placeholder, type, onChange, multiple, filtersQueryToShowLoading }: Props) {
  const { setFieldValue, errors, touched, values } = useFormikContext()

  const isLoading = useIsFetching(filtersQueryToShowLoading) > 0

  // @ts-expect-error
  const value = Array.isArray(values[name]) ? values[name] : []
  // @ts-expect-error
  const isTouched = !!touched[name]
  // @ts-expect-error
  const hasError = !!errors[name]
  const shouldShowError = isTouched && hasError

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)

    const currentFiles = Array.from(event.currentTarget.files ?? [])

    if (!multiple) return setFieldValue(name, [currentFiles[0]])

    const files = currentFiles.concat(Array.from(value)).filter((file, index, array) => array.findIndex((f) => (f as File).name === (file as File).name) === index)

    setFieldValue(name, files)
  }

  const handleOnRemoveFileClick = (fileName: string) => () => {
    const files = Array.from(value).filter((file) => (file as File).name !== fileName)

    setFieldValue(name, files)
  }

  return (
    <div className='flex flex-col gap-y-2'>
        <label htmlFor={name} className="text-md flex items-center">
          <p className="flex-1">
            {label}
          </p>
          <PlusIcon size={18} className="cursor-pointer" />
        </label>
        <Field
          id={name}
          name={name}
          type={type}
          value={undefined}
          placeholder={placeholder}
          onChange={handleOnInputChange}
          multiple={multiple}
          className="hidden"
        />
        {value.map((file: File) => (
          <div key={file.name} data-show-error={shouldShowError} className="rounded-md border border-gray-300 px-3 py-2 flex flex-1 items-center gap-3">
            <p className="flex-1">{file.name}</p>
            <p>{prettyBytes(file.size)}</p>
            <CircleXIcon size={18} className="cursor-pointer" onClick={handleOnRemoveFileClick(file.name)} />
            <a title="Fazer download do arquivo" download={file.name} href={URL.createObjectURL(file)}>
              <Download size={18} className="cursor-pointer" />
            </a>
          </div>
        ))}
        <div className="flex flex-1 justify-center">
          <Loader2 className='hidden data-[is-loading=true]:block w-6 h-6 animate-spin text-blue-500' data-is-loading={isLoading} />
        </div>
        <p className='text-red-500 text-xs'>
            <ErrorMessage name={name} />
            &#8203;
        </p>
    </div>
  )
}