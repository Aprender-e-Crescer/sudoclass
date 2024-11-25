import { InputCheckbox } from '@/components/custom/checkbox-input'
import { InputFile } from '@/components/custom/file-input'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterClassController } from '@/controllers/use-register-class-form'
import { creationClassSchema } from '@/models/creation-class-schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import { parse } from 'date-fns'
import { Form, Formik } from 'formik'
import { Else, If, Then } from 'react-if'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']),
  idClass: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/classes/manage')({
  component: ClassCreationForm,
  validateSearch,
})

const checkboxFinishedValues = [
  {
    value: 'Sim',
    label: 'yesFinished',
  },
  {
    value: 'Não',
    label: 'noFinished',
  },
]

const checkboxReleasedValues = [
  {
    value: 'Sim',
    label: 'yes',
  },
  {
    value: 'Não',
    label: 'no',
  },
]

const initialValues = {
  class: '',
  shift: '',
  startForecast: '',
  endPrediction: '',
  registrationFinalDate: '',
  quantityHours: '',
  totalVacancies: '',
}

function useLogic() {
  const { registerClassForm } = useRegisterClassController()
  const { action } = Route.useSearch()

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
      registrationFinalDate: parse(values.registrationFinalDate, 'dd/MM/yyyy', new Date()),
    }

    registerClassForm(formattedValues)
  }

  return { handleOnClassCreationSubmit, action }
}

export function ClassCreationForm() {
  const { handleOnClassCreationSubmit, action } = useLogic()
  return (
    <Formik
      onSubmit={handleOnClassCreationSubmit}
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(creationClassSchema)}
    >
      <Form className="flex flex-1">
        <div className="p-2 flex flex-1 flex-col">
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

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p>Concluido</p>
              <div className="flex gap-8">
                <InputCheckbox checkboxValues={checkboxFinishedValues} />
              </div>
            </div>

            <div className="flex flex-col">
              <p>Liberado</p>
              <div className="flex gap-8">
                <InputCheckbox checkboxValues={checkboxReleasedValues} />
              </div>
            </div>
          </div>

          <InputFile
            title="Anexar Arquivo"
            label="attachment"
            id="Anexar Arquivo"
            name="Anexar Arquivo"
            placeholder="Anexar Arquivo"
          />

          <div className="flex items-center justify-center gap-3">
            <Link to="/register/classes">
              <Button variant="lightTextBlack">Cancelar</Button>
            </Link>
            <If condition={action === 'create'}>
              <Then>
                <Button variant="blueButton">Cadastrar</Button>
              </Then>
              <Else>
                <Button variant="blueButton">Editar</Button>
              </Else>
            </If>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
