import { createFileRoute } from '@tanstack/react-router'
import { InputCheckbox } from '@/components/custom/checkbox-input'
import { InputForm } from '@/components/custom/text-input'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { DateOrTimeInput } from '@/components/custom/date-or-time-input'

export const Route = createFileRoute('/register-classes-lesson-plan')({
  component: RegisterClassesLessonPlan,
})

const weekDays = [
  { value: 'Segunda-feira', label: 'monday' },
  { value: 'Terça-feira', label: 'tuesday' },
  { value: 'Quarta-feira', label: 'wednesday' },
  { value: 'Quinta-feira', label: 'thursday' },
  { value: 'Sexta-feira', label: 'friday' },
]

const registerClassesSchema = z.object({
  days: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
})

const initialValues = {
  days: '',
}

export function RegisterClassesLessonPlan() {
  return (
    <div>
      <Formik
        validationSchema={toFormikValidationSchema(registerClassesSchema)}
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        <Form>
          <div className="flex flex-col flex-1">
            <div className="p-3 border border-gray-200 flex items-center font-medium">
              <h1>Cadastrar aulas</h1>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between py-3 px-10 items-center max-[600px]:flex-col">
                <div className="flex flex-col gap-2">
                  <InputCheckbox checkboxValues={weekDays} />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-1 sm:flex-row flex-col gap-2">
                    <InputForm
                      id="initialHour"
                      name="initialHour"
                      label="initialHour"
                      title="Hora inicial"
                      placeholder="19:00"
                    />
                    <InputForm id="endHour" name="endHour" label="endHour" title="Hora final" placeholder="22:00" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button variant={'blueButton'}>Marcar</Button>
                    <Button variant={'blueButton'}>Remover</Button>
                  </div>
                </div>
              </div>

              <div className="flex ml-10 xl:gap-96 lg:gap-80 sm:gap-40 gap-20">
                <p>Data</p>
                <p>Hora inicial</p>
                <p>Hora final</p>
              </div>
              <div className="bg-gray-400 py-3 pl-10 text-2xl">
                <p>Mês de 2024</p>
              </div>

              <div className="flex flex-1 pl-10">
                <div className="flex flex-col w-60">
                  <InputCheckbox checkboxValues={weekDays} />
                </div>
                <div className="flex flex-1 gap-3">
                  <DateOrTimeInput title="Hora Inicial" id="teste1" name="teste1" type="time" />
                  <DateOrTimeInput title="Hora Final" id="teste2" name="teste2" type="time" />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
