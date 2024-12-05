import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { addNewCourseSchema } from '@/models/add-new-course-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useCreateCourse } from '@/mutations/use-create-course-mutation'

export const Route = createFileRoute('/_authenticated/courses/')({
  component: AddNewCourseForm,
})

const initialValues = {
  name: '',
  startDate: '',
  endDate: '',
  workload: '',
  numberOfVacancies: '',
  startOfRegistration: '',
  endOfRegistration: '',
  ementa: '',
}

function AddNewCourseForm() {
  const { mutate, isPending } = useCreateCourse()

  const handleSubmit = (values: typeof initialValues) => {
    mutate(
      {
        ...values,
        workload: values.workload,
        numberOfVacancies: Number(values.numberOfVacancies), 
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        startOfRegistration: new Date(values.startOfRegistration),
        endOfRegistration: new Date(values.endOfRegistration),
      },
      {
        onSuccess: () => {
          alert('Curso criado com sucesso!')
        },
        onError: (error) => {
          console.error('Erro ao criar curso:', error)
          alert('Erro ao criar curso. Por favor, tente novamente.')
        },
      },
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(addNewCourseSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold p-5 ml-10">Adicionar Curso</h1>
          <hr />
          <div className="p-6">
            <InputForm
              title="Nome"
              label="Nome"
              name="name"
              placeholder="Nome do curso"
              id="name"
            />
            <InputForm
              title="Data de Início"
              label="Data de Início"
              name="startDate"
              placeholder="00/00/0000"
              id="startDate"
              type="date"
            />
            <InputForm
              title="Data de Término"
              label="Data de Término"
              name="endDate"
              placeholder="00/00/0000"
              id="endDate"
              type="date"
            />
            <InputForm
              title="Carga Horária"
              label="Carga Horária"
              name="workload"
              placeholder="500hrs"
              id="workload"
            />
            <InputForm
              title="Número de Vagas"
              label="Número de Vagas"
              name="numberOfVacancies"
              placeholder="30"
              id="numberOfVacancies"
            />
            <InputForm
              title="Início das Inscrições"
              label="Início das Inscrições"
              name="startOfRegistration"
              placeholder="00/00/0000"
              id="startOfRegistration"
              type="date"
            />
            <InputForm
              title="Término das Inscrições"
              label="Término das Inscrições"
              name="endOfRegistration"
              placeholder="00/00/0000"
              id="endOfRegistration"
              type="date"
            />
            <InputForm
              title="Ementa"
              label="Ementa"
              name="ementa"
              placeholder="Ementa do curso"
              id="ementa"
              />
          </div>
          <div className="flex items-center justify-center mt-5">
            <Button variant="lightTextBlack" disabled={isPending}>
              Cancelar
            </Button>
            <Button variant="blueButton" type="submit" disabled={isPending}>
              {isPending ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
