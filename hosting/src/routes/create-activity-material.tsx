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
      <div className="flex h-full w-full md:hidden">
        <div className="flex flex-col w-full">
          

          <div className="flex flex-col w-full justify-around gap-4 p-5 ">
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
            <div className="flex flex-col w-full h-64 border p-6">
              <p>Título</p>
              <input type="text" className="border rounded-sm w-full" />
              <p>Instruções</p>
              <input type="text" className="border p-10 rounded-sm w-full" />
            </div>
            <p>Anexar</p>
            <div className="flex justify-center border w-full p-4 rounded-sm">
            
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white border rounded-full flex items-center justify-center">
                  <Download color="black" size={50} />
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*mobile*/}
      {/*PC*/}
      <div className="hidden md:flex h-full w-full">
        <div className="flex flex-col w-full gap-10">
          
          <div className="flex justify-around mx-10 gap-10">
            
            <div className="flex flex-col w-full h-64 border p-6">
              <p>Título</p>
              <input type="text" className="border rounded-sm w-full" />
              <p>Instruções</p>
              <input type="text" className="border p-7 rounded-sm w-full" />
            </div>
            

            <div className="border flex flex-col w-1/4 justify-around gap-4 p-5">
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
            
          </div>
          
          
          <div className="flex justify-around border p-4 rounded-sm mx-10 items-center">
          <p>Anexar</p>
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white border rounded-full flex items-center justify-center">
                <Download color="black" size={50} />
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/*PC*/}
    </>
  )
}
