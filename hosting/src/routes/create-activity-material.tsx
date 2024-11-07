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
          size="medium"
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

  const addActivity = async (values: typeof initialValues) => {
    try {
      const activitiesRef = collection(
        firestore,
        'schoolMatrices',
        'aQjvxCKlEuHc9YQEedCQ',
        'subjects',
        'zGTOAwnKJBjFSmayHxJo',
        'activities',
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
      <div className="flex h-full w-full mt-10 ">
        <div className="flex flex-col w-full">
          <div className="flex justify-around mx-10">
            <div className="flex flex-col w-full h-full border p-6 ">
              <Formik initialValues={initialValues} onSubmit={addActivity}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="flex flex-col  gap-12">
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
                      <div className="w-32">
                        <p>Peso</p>
                        <InputWithoutLabel
                          id="value"
                          name="value"
                          placeholder="Digite o valor da atividade"
                          onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                        />
                      </div>

                      <div className="flex justify-between items-center ">
                        <div>
                          <p>Data de entrega</p>
                          <DatePickerDemo date={date} setDate={setDate} />
                        </div>

                        <Button type="submit" size="medium">
                          Criar atividade
                        </Button>
                      </div>
                    </div>
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
