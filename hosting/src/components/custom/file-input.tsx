import { Field } from 'formik'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, Upload } from 'lucide-react'

interface FileInputProps {
  label: string
  title: string
  id: string
  placeholder: string
  name: string
}

export function InputFile({ id, label, title, placeholder, name }: FileInputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={label}>{title}</label>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Plus />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <label htmlFor={label} className="flex gap-2 items-center">
                Carregar do dispositivo
                <Upload className="h-4 w-4" />
              </label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <label htmlFor={id} className="cursor-pointer bg-white border border-gray-200 rounded w-full py-2">
        {placeholder}
      </label>
      <Field placeholder={placeholder} id={id} name={name} type="file" className="invisible" />
    </div>
  )
}
