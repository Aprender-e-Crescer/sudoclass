import { AlertDialogComponent } from '@/components/custom/alert-dialog'
import { InputCheckbox } from '@/components/custom/checkbox-input'
import { InputFile } from '@/components/custom/file-input'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useRegisterClassController } from '@/controllers/use-register-class-form'
import { creationClassSchema } from '@/models/creation-class-schema'
import { useListClassQuery } from '@/queries/use-class-list-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Pencil } from 'lucide-react'
import { Else, If, Then, When } from 'react-if'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { parse } from 'date-fns'
import { z } from 'zod'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
})

export const Route = createFileRoute('/_authenticated/register/_register/classes/')({
  component: ClassList,
  validateSearch,
})

const initialValues = {
  class: '',
  shift: '',
  startForecast: '',
  endPrediction: '',
  registrationFinalDate: '',
  quantityHours: '',
  totalVacancies: '',
}

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

export function ClassList() {
  const { action } = Route.useSearch()
  const { registerClassForm } = useRegisterClassController()
  const { data: classes } = useListClassQuery()

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
  return (
    <div className="w-full px-4 flex justify-center flex-col gap-6 mt-5">
      <div className="flex flex-col flex-1 gap-5">
        <Link to="/register/classes" search={{ action: 'create' }}>
          <Button variant="blueButton" size="medium">
            Cadastrar nova turma
          </Button>
        </Link>

        <div className="flex gap-7">
          <div
            className="flex flex-col gap-4 font-bold text-blue-950 text-lg data-[no-action=true]:flex-1"
            data-no-action={!action}
          >
            {classes?.map(({ name }, index) => (
              <div key={index} className="flex flex-col gap-10 w-full">
                <p className="border rounded-xl p-3 flex justify-between">
                  {name}
                  <div className="flex gap-2">
                    <AlertDialogComponent
                      title="Deseja excluir a turma?"
                      cancelButtonValue="Excluir"
                      variantCancelButton="blueButton"
                    />
                    <Link to="/register/classes" search={{ action: 'edit' }}>
                      <Pencil className="border rounded text-zinc-500 w-8 h-8" />
                    </Link>
                  </div>
                </p>
              </div>
            ))}
          </div>
          <When condition={!!action}>
            <Formik
              onSubmit={handleOnClassCreationSubmit}
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(creationClassSchema)}
            >
              <Form className="flex flex-1">
                <div className="flex flex-1 flex-col border p-2 rounded-lg">
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
          </When>
        </div>
      </div>
    </div>
  )
}
