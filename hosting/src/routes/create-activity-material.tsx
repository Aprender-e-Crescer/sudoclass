import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { format } from 'date-fns'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

const OpcaoDePontos = [
  {
    value: '100',
    label: '100 pontos',
  },
  {
    value: '90',
    label: '90 pontos',
  },
  {
    value: '80',
    label: '80 pontos',
  },
  {
    value: '70',
    label: '70 pontos',
  },
  {
    value: '60',
    label: '60 pontos',
  },
  {
    value: '50',
    label: '50 pontos',
  },
  {
    value: '40',
    label: '40 pontos',
  },
  {
    value: '30',
    label: '30 pontos',
  },
  {
    value: '20',
    label: '20 pontos',
  },
  {
    value: '10',
    label: '10 pontos',
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="lightTextBlack"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-center items-center"
        >
          {value ? OpcaoDePontos.find((pontos) => pontos.value === value)?.label : 'Selecione os pontos...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 bg-white z-50 bg-gray-200">
        <Command>
          <CommandInput placeholder="Search pontos..." />
          <CommandList>
            <CommandEmpty>Nao tem opção de pontos</CommandEmpty>
            <CommandGroup>
              {OpcaoDePontos.map((pontos) => (
                <CommandItem
                  key={pontos.value}
                  value={pontos.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === pontos.value ? 'opacity-100' : 'opacity-0')} />
                  {pontos.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="lightTextBlack"
          className={cn(' justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-gray-200">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  return (
    <>
      <div className="flex flex-col h-full w-full gap-2 justify-center items-center">
        <div className="flex w-full h-14 items-center justify-around">
          <SubHeader />
          <Button variant="blueButton" size="small">
            Reunião
          </Button>
        </div>
        <div className='h-[1px] bg-gray-200 w-full' ></div>
        <div className="flex justify-between w-full h-full mx-40">
          
          <div></div>
          <div className='flex flex-col w-2/3'>
          <div className="flex flex-col w-full h-56 border rounded-lg p-6">
            <p>Titulo</p>
            <input type="text" className="border rounded-sm" />
            <p>instruções</p>
            <input type="text" className="border p-7 rounded-sm" />


          </div>

          </div>
          
          <div className="w-1/5 border p-5">
            <p>Atribuir a</p>
            <Button variant="lightTextBlack" size="large">
              Todos os estudantes
            </Button>
            <p>Pontos</p>
            <ComboboxDemo />
            <p>Data</p>
            <div className="flex justify-start">
              <DatePickerDemo />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}
