import { Checkbox } from '@/components/ui/checkbox'

interface CheckboxProps {
  checkboxValues: {
    value: string
    label: string
  }[]
}

export function CheckboxInput({ checkboxValues }: CheckboxProps) {
  return (
    <>
      {checkboxValues.map(({ value, label }, index) => (
        <div className="flex items-center space-x-2 mt-2" key={index}>
          <Checkbox id={label} name={label} />
          <label
            htmlFor={label}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {value}
          </label>
        </div>
      ))}
    </>
  )
}
