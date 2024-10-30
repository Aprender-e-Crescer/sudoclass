import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'

interface SelectProps {
  placeholder?: string
  label: string
  onChange?: (value: string) => void
  customStyle?: string
  optionsSelectItem?: {
    selectOption: string
  }[]
}

export function SelectInput({ label, optionsSelectItem, onChange, customStyle, placeholder }: SelectProps) {
  return (
    <div className="flex flex-1">
      <Label htmlFor={label} />
      <Select onValueChange={onChange}>
        <SelectTrigger id={label} className={`${customStyle ? customStyle : 'w-full bg-white'}`}>
          <SelectValue placeholder={placeholder ?? 'Selecione uma opção'}>{placeholder}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {optionsSelectItem &&
            optionsSelectItem.map(({ selectOption }, index) => (
              <SelectItem key={index} value={selectOption}>
                {selectOption}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
