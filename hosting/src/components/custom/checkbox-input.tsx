import { Checkbox } from '@/components/ui/checkbox'
import { useFormikContext } from 'formik'

interface CheckboxProps {
  checkboxValues: {
    value: boolean
    label: string
  }[]
  fieldName: string
}

export function InputCheckbox({ checkboxValues, fieldName }: CheckboxProps) {
  const { setFieldValue } = useFormikContext()

  return (
    <>
      {checkboxValues.map(({ value, label }, index) => (
        <div className="flex items-center space-x-2 mt-2" key={index}>
          <Checkbox id={label} name={label} onCheckedChange={() => setFieldValue(fieldName, value)} />
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
