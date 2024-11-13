import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { InputForm } from '@/components/custom/text-input'
import { InputCheckbox } from '@/components/custom/checkbox-input'
import { Button } from '@/components/ui/button'
import { InputFile } from '@/components/custom/file-input'
import { Link } from '@tanstack/react-router'
import { useRegisterClassController } from '@/controllers/use-register-class-form'
import { creationClassSchema } from '@/models/creation-class-schema'
import { parse } from 'date-fns'

const initialValues = {
  class: '',
  shift: '',
  startForecast: '',
  endPrediction: '',
  registrationFinalDate: '',
  quantityHours: '',
  totalVacancies: '',
}
export const Route = createFileRoute('/_authenticated/class-creation-form')({
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

function useLogic() {
  const { registerClassForm } = useRegisterClassController()

  const handleOnClassCreationSubmit = (values: {
    class: string
    shift: string
    startForecast: string
    endPrediction: string
    registrationFinalDate: string
    quantityHours: string
    totalVacancies: string
  }) => {
    const formattedValues = {
      ...values,
      startForecast: parse(values.startForecast, 'dd/MM/yyyy', new Date()),
      endPrediction: parse(values.endPrediction, 'dd/MM/yyyy', new Date()),
      registrationFinalDate: parse(
        values.registrationFinalDate,
        'dd/MM/yyyy',
        new Date(),
      ),
    }

    registerClassForm(formattedValues)
  }

  return { handleOnClassCreationSubmit }
}

export function ClassCreationForm() {
  const { handleOnClassCreationSubmit } = useLogic()
  return (
    <Formik
      onSubmit={handleOnClassCreationSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(creationClassSchema)}
    >
      <Form>
        <div className=" ml-4 flex flex-col">
          <InputForm
            title="Turmas"
            id="class"
            name="class"
            label="class"
            placeholder="Nome Da Turma"
          />

          <InputForm
            title="Turno"
            id="shift"
            name="shift"
            label="shift"
            placeholder="Turno"
          />

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
            <Link to="/class-list">
              <Button variant="lightTextBlack">Cancelar</Button>
            </Link>
            <Button variant="blueButton">Cadastrar</Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
