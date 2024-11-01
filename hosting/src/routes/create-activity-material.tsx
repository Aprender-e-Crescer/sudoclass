import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { format } from 'date-fns'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { SheetActivies } from '@/components/custom/sheet-activies'
import { Form, Formik, Field } from 'formik'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'

export function DatePickerDemo({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghostBlack"
          className={cn('bg-slate-200 justify-start text-left', !date && 'text-muted-foreground')}
        >
          {date ? format(date, 'PPP') : <span>Escolha a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-gray-200">
        <Calendar mode="single" selected={date || undefined} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const initialValues = {
    title: '',
    instructions: '',
    value: '',
  }

  const addActivity = async (values: any) => {
    try {
      const activitiesRef = collection(
        firestore,
        'schoolMatrices',
        'aQjvxCKlEuHc9YQEedCQ',
        'subjects',
        'zGTOAwnKJBjFSmayHxJo',
        'activities'
      )
      const newActivity = {
        title: values.title,
        instructions: values.instructions,
        value: values.value,
        date: date,
      }
      await addDoc(activitiesRef, newActivity)
      alert('Atividade criada com sucesso!')
    } catch (e) {
      console.error('Erro ao adicionar atividade: ', e)
      alert('Erro ao criar atividade.')
    }
  }

  return (
    <>
      <div className="flex h-full w-full mt-10 md:hidden">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full justify-around gap-4 p-5">
            <SheetActivies />
            <p>Pontos</p>
            <p>Data</p>
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
          <div className="flex flex-col h-full w-full gap-2 justify-center items-center">
            <div className="flex flex-col w-full h-64 border p-6">
              <p>Título</p>
              <input type="text" className="border p-10 rounded-sm w-full" />
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

      <div className="hidden md:flex h-full w-full mt-10">
        <div className="flex flex-col w-full gap-10">
          <div className="flex justify-around mx-10 gap-10">
            <div className="flex flex-col w-full h-64 border p-6">
              <Formik initialValues={initialValues} onSubmit={addActivity}>
                {({ setFieldValue }) => (
                  <Form>
                    <div>
                      <p>Título</p>
                      <Field name="title" placeholder="Digite o título" className="border rounded-sm w-full p-2" />
                    </div>
                    <div>
                      <p>Instruções</p>
                      <Field
                        name="instructions"
                        placeholder="Digite as instruções"
                        className="border p-7 rounded-sm w-full"
                      />
                    </div>
                    <div>
                      <p>Pontos</p>
                      <InputWithoutLabel
                        id="value"
                        name="value"
                        placeholder="Digite o valor da atividade"
                        onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <div>
                      <p>Data de entrega</p>
                      <DatePickerDemo date={date} setDate={setDate} />
                    </div>
                    <Button type="submit">Criar atividade</Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
