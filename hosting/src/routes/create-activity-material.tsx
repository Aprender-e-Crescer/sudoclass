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
import { z } from 'zod'

export const Route = createFileRoute('/create-activity-material')({
  component: CreateActivityMaterial,
})

export function CreateActivityMaterial() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const { mutate: createActivity } = useCreateActivityMutation()

  const activitySchema = z.object({
    title: z
      .string()
      .min(3, 'O título precisa ter no mínimo 3 caracteres')
      .max(100, 'O título pode ter no máximo 100 caracteres')
      .nonempty('O título é obrigatório'),
    instructions: z
      .string()
      .min(5, 'As instruções precisam ter no mínimo 5 caracteres')
      .max(500, 'As instruções podem ter no máximo 500 caracteres')
      .nonempty('As instruções são obrigatórias'),
      value: z
      .string()
      .regex(/^\d+$/, 'O valor precisa ser um número') 
      .nonempty('O valor (peso) é obrigatório') 
      .transform((val) => parseInt(val, 10)) 
      .refine((val) => val >= 0, 'O valor não pode ser negativo')
      .refine((val) => val <= 100, 'O valor não pode ser maior que 100'),
    
    date: z.date().refine((val) => !isNaN(val.getTime()), 'A data de entrega é obrigatória'),
  })

  const initialValues = {
    title: '',
    instructions: '',
    value: '',
    date: date,
  }

  const handleSubmit = async (values: any) => {
    try {
      const newActivity = {
        title: values.title,
        instructions: values.instructions,
        value: values.value,
        date: date,
      }

      await createActivity(newActivity)
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
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={async (values) => {
                  try {
                    activitySchema.parse(values) // Validando com Zod
                    return {}
                  } catch (e) {
                    if (e instanceof z.ZodError) {
                      const errors: Record<string, string> = {}
                      e.errors.forEach((error) => {
                        errors[error.path[0]] = error.message
                      })
                      return errors
                    }
                    return {}
                  }
                }}
              >
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
                          name="instructions"
                          placeholder="Digite as instruções"
                          className="border p-7 rounded-sm w-full"
                        />
                        {touched.instructions && errors.instructions && (
                          <div className="text-red-500 text-sm">{errors.instructions}</div>
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
                          {touched.date && errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
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

// Componente DatePickerDemo
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
