import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputForm } from '@/components/custom/text-input'
import { InputCheckbox } from '@/components/custom/checkbox-input'
import { Button } from '@/components/ui/button'
import { InputFile } from '@/components/custom/file-input'

const creationClassSchema = z.object({
  class: z.string().min(4, { message: 'Insira um nome de turma válido.' }),
  shift: z.string().min(4, { message: 'Insira um válido.' }),
  startForecast: z.date({ message: 'Insira uma data válida.' }),
  endPrediction: z.date({ message: 'Insira um data válida.' }),
  registrationFinalDate: z.date({ message: 'Insira uma data válida' }),
  quantityHours: z.string().min(2, { message: `Insira um valor válido` }),
  totalVacancies: z.string().min(2, { message: `Insira um valor válido` }),
})

const initialValues = {
  days: '',
}

export const Route = createFileRoute('/class-creation-form')({
  component: ClassCreationForm,
})

const checkboxValues = [
  {
    value: 'Sim',
    label: 'yes',
  },
  {
    value: 'Não',
    label: 'no',
  },
]

export function ClassCreationForm() {
  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(creationClassSchema)}
    >
      <Form>
        <div className=" ml-4 flex flex-col">
          <InputForm title="Turmas" id="class" name="class" label="class" placeholder="Nome Da Turma" />

          <InputForm title="Turno" id="shift" name="shift" label="shift" placeholder="Turno" />

          <InputForm
            title="Previsão de Início"
            id="startForecast"
            name="startForecast"
            label="startForecast"
            placeholder="Previsão de início"
          />

          <InputForm
            title="Previsão de Fim"
            id="endPrediction"
            name="endPrediction"
            label="endPrediction"
            placeholder="Previsão de Fim"
          />

          <InputForm
            title="Data Final de Inscrição"
            id="registrationFinalDate"
            name="registrationFinalDate"
            label="registrationFinalDate"
            placeholder="Data Final de Inscrição"
          />

          <InputForm
            title="qtde. Horas"
            id="quantityHours"
            name="quantityHours"
            label="quantityHours"
            placeholder="qtde. Horas"
          />

          <InputForm
            title="Total de Vagas"
            id="totalVacancies"
            name="totalVacancies"
            label="totalVacancies"
            placeholder="Total de Vagas"
          />

          <div className="flex-colum py-6">
            <p>Concluido</p>
            <div className="flex space-x-8">
              <InputCheckbox checkboxValues={checkboxValues} />
            </div>
          </div>

          <div className="flex-colum mb-4">
            <p>Liberado</p>
            <div className="flex space-x-8">
              <InputCheckbox checkboxValues={checkboxValues} />
            </div>
          </div>

          <InputFile
            title="Anexar Arquivo"
            label="attachment"
            id="Anexar Arquivo"
            name="Anexar Arquivo"
            placeholder="Anexar Arquivo"
          />

          <div className="flex sm:flex-row flex-col gap-3">
            <Button variant="lightTextBlack">cancelar</Button>
            <Button variant="blueButton">Cadastrar</Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
