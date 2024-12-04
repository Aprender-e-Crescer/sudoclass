import { AlertDialogComponent } from '@/components/custom/alert-dialog'
import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { useClassesController } from '@/controllers/use-class-controller'
import { creationClassSchema } from '@/models/creation-class-schema'
import { useListClassQuery } from '@/queries/use-class-list-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Else, If, Then, When } from 'react-if'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'

const validateSearch = z.object({
  action: z.enum(['create', 'edit']).optional(),
  idTurma: z.number().optional(),
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

export function ClassList() {
  const { action, idTurma } = Route.useSearch()
  const { registerClassForm, updateClass, deleteClass } = useClassesController()
  const { data: classes } = useListClassQuery()

  const handleOnClassCreationSubmit = (values: {
    class: string
    shift: string
    startForecast: Date
    endPrediction: Date
    registrationFinalDate: Date
    quantityHours: number
    totalVacancies: number
  }) => {
    if (idTurma) {
      return updateClass({
        idTurma,
        nome_turma: values.class,
        turno: values.shift,
        cargahoraria: values.quantityHours,
        datainicio: values.startForecast,
        datafim: values.endPrediction,
        ementa: 'ementa',
        dataFinalIncricao: values.registrationFinalDate,
        vagasincricoes: values.totalVacancies,
      })
    }
    registerClassForm({
      nome_turma: values.class,
      turno: values.shift,
      cargahoraria: values.quantityHours,
      datainicio: values.startForecast,
      datafim: values.endPrediction,
      ementa: 'ementa',
      dataFinalIncricao: values.registrationFinalDate,
      vagasincricoes: values.totalVacancies,
    })
  }

  return (
    <div className="w-full px-4 flex justify-center flex-col gap-6 mt-5">
      <div className="flex flex-col flex-1 gap-5">
        <Link to="/register/classes" search={{ action: 'create' }}>
          <Button variant="blueButton" size="medium">
            Cadastrar nova turma
          </Button>
        </Link>

        <div className="flex lg:flex-row flex-col gap-7">
          <div
            className="flex flex-col gap-4 font-bold text-blue-950 text-lg data-[no-action=true]:flex-1"
            data-no-action={!action}
          >
            {classes?.map(({ name, id_turma }, index) => (
              <div className="flex items-center gap-2 flex-1">
                <Link to="/register/classes" search={{ action: 'edit', idTurma: id_turma }} className="flex flex-1">
                  <div key={index} className="flex flex-col gap-10 min-w-96 w-full">
                    <p className="border rounded-xl p-3 flex justify-between">{name}</p>
                  </div>
                </Link>
                <div className="flex gap-2">
                  <AlertDialogComponent
                    title="Deseja excluir a turma?"
                    cancelButtonValue="Excluir"
                    variantCancelButton="blueButton"
                    onClick={() => deleteClass(id_turma)}
                  />
                </div>
              </div>
            ))}
          </div>
          <When condition={!!action}>
            <Formik
              onSubmit={(values) => handleOnClassCreationSubmit(values)}
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(creationClassSchema)}
            >
              <Form className="flex flex-1">
                <div className="flex flex-1 flex-col border p-2 rounded-lg">
                  <div className="flex flex-col flex-1 justify-end items-end">
                    <Link to="/charts" search={{ idClass: idTurma }}>
                      <Button variant="blueButton" size="large" className="w-64">
                        Estatisticas da turma
                      </Button>
                    </Link>
                  </div>
                  <InputForm title="Turmas" id="class" name="class" label="class" placeholder="Nome Da Turma" />

                  <InputForm title="Turno" id="shift" name="shift" label="shift" placeholder="Turno" />

                  <InputForm
                    title="Previsão de Início"
                    id="startForecast"
                    name="startForecast"
                    label="startForecast"
                    type="date"
                    placeholder="Previsão de início"
                  />

                  <InputForm
                    title="Previsão de Fim"
                    id="endPrediction"
                    name="endPrediction"
                    label="endPrediction"
                    type="date"
                    placeholder="Previsão de Fim"
                  />

                  <InputForm
                    title="Data Final de Inscrição"
                    id="registrationFinalDate"
                    name="registrationFinalDate"
                    label="registrationFinalDate"
                    type="date"
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

                  <InputForm title="Ementa" label="attachment" id="menu" name="menu" placeholder="menu" />

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
