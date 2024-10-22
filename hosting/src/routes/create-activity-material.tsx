import { SubHeader } from '@/components/custom/subheader'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { format } from 'date-fns'
import { Check, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { SheetActivies } from '@/components/custom/sheet-activies'

const OpcaoDePontos = Array.from({ length: 10 }, (_, index) => ({
  value: `${(10 - index) * 10}`,
  label: `${(10 - index) * 10} pontos`,
}))

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="small"
          variant="ghostBlack"
          role="combobox"
          aria-expanded={open}
          className="bg-slate-200 w-[200px] justify-center items-center"
        >
          {value ? OpcaoDePontos.find((pontos) => pontos.value === value)?.label : 'Valor'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 bg-white z-50">
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
          variant="ghostBlack"
          className={cn(' bg-slate-200 justify-start text-left ', !date && 'text-muted-foreground')}
        >
          {date ? format(date, 'PPP') : <span>Escolha a data</span>}
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
      {/*mobile*/}
      <div className="flex md:hidden">
        <div className="flex flex-col w-full">
          <div className="flex flex-col h-16 md:flex-row w-full items-center justify-around">
            <SubHeader />
            <Button variant="blueButton" size="small">
              Reunião
            </Button>
          </div>

          <div className="flex w-full justify-around gap-4 p-5">
            <div>
              <SheetActivies />
            </div>
            <div>
              <p>Pontos</p>
              <ComboboxDemo />
            </div>
            <div>
              <p>Data</p>
              <div className="flex justify-start">
                <DatePickerDemo />
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full w-full gap-2 justify-center items-center">
            <div className="flex flex-col w-full h-56 border p-6">
              <p>Título</p>
              <input type="text" className="border rounded-sm w-full" />
              <p>Instruções</p>
              <input type="text" className="border p-7 rounded-sm w-full" />
            </div>
            <div className='inline-block'>

            </div>
            <div className="flex w-full justify-center">
              <div className="flex justify-center border w-full md:w-2/3 p-4 rounded-sm *:">
                <div className="w-24 h-24 bg-white border rounded-full flex items-center justify-center text-white text-lg transition duration-200 hover:bg-blue-700 cursor-pointer">
                  <Download color="black" size={50} />
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*mobile*/}
    </>
  )
}
