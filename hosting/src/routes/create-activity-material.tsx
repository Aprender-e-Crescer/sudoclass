import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Form, Formik, Field } from 'formik'
import { InputWithoutLabel } from '@/components/custom/without-label-input'
import { useCreateActivityMutation } from '@/mutations/use-create-activity-mutation'
import { activitySchema } from '@/models/activity-schema'


export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const { mutate: createActivity } = useCreateActivityMutation()

  const initialValues = {
    title: '',
    instruction: '',
    value: '',
    deliveryDate: date,
  }

  const addActivity = async (values: typeof initialValues) => {
  const handleSubmit = async (values: any, { setErrors }: any) => {
    try {
      const parsed = activitySchema.safeParse(values)
      if (!parsed.success) {
        const errors: Record<string, string> = {}
        parsed.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message
        })
        setErrors(errors)
        return
      }

      const newActivity = {
        title: values.title,
        instruction: values.instruction,
        value: parseInt(values.value, 10),
        deliveryDate: date,
      }

      if (!newActivity.deliveryDate) {
        setErrors({ deliveryDate: 'A data de entrega é obrigatória' })
        return
      }

      await createActivity(newActivity)
    } catch (e) {
      console.error('Erro ao adicionar atividade: ', e)
    }
  }

  return (
    <div className="flex h-full w-full mt-10 ">
      <div className="flex flex-col w-full">
        <div className="flex justify-around mx-10">
          <div className="flex flex-col w-full h-full border p-6 ">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ setFieldValue, errors, touched }) => (
                <Form>
                  <div className="flex flex-col gap-12">
                    <div>
                      <p>Título</p>
                      <Field name="title" placeholder="Digite o título" className="border rounded-sm w-full p-2" />
                      {touched.title && errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>
                    <div>
                      <p>Instruções</p>
                      <Field
                        name="instruction"
                        placeholder="Digite as instruções"
                        className="border p-7 rounded-sm w-full"
                      />
                      {touched.instruction && errors.instruction && (
                        <div className="text-red-500 text-sm">{errors.instruction}</div>
                      )}
                    </div>
                    <div className="w-32">
                      <p>Peso</p>
                      <InputWithoutLabel
                        id="value"
                        name="value"
                        placeholder="Digite o valor da atividade"
                        onChange={(e) => setFieldValue('value', e.target.value.replace(/\D/g, ''))}
                      />
                      {touched.value && errors.value && <div className="text-red-500 text-sm">{errors.value}</div>}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p>Data de entrega</p>
                        <DatePickerDemo date={date} setDate={setDate} />
                        {touched.deliveryDate && errors.deliveryDate && (
                          <div className="text-red-500 text-sm">{errors.deliveryDate}</div>
                        )}
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
  )
}

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
