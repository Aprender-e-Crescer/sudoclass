import { InputForm } from '@/components/custom/text-input'
import { Button } from '@/components/ui/button'
import { addNewCourseSchema } from '@/models/add-new-course-schema'
import { useCreateSchoolMatriceMutation } from '@/mutations/use-create-school-matrice-mutation'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/add-new-course')({
  component: AddNewCourseForm,
})

const initialValues = {
  name: '',
  startDate: '',
  endDate: '',
  workload: '',
  startOfRegistration: '',
  endOfRegistration: '',
  numberOfVacancies: '',
}

function AddNewCourseForm() {
  const { mutate, isPending, error } = useCreateSchoolMatriceMutation()

  console.log(isPending, error)

  const handleSubmit = (values: typeof initialValues) => mutate(values)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(addNewCourseSchema)}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, values }) => {
        console.log(values)
        return (
          <form onSubmit={handleSubmit}>
            <h1 className="font-semibold p-5 ml-10">Adicionar curso</h1>
            <hr />
            <div className="p-6">
              <InputForm title="Nome" label="Nome" name="name" placeholder="Nome" id="name" />
              <InputForm
                title="Data de inicio"
                label="Data de inicio"
                name="startDate"
                placeholder="00/00/0000"
                id="startDate"
              />
              <InputForm
                title="Data de termino"
                label="Data de termino"
                name="endDate"
                placeholder="00/00/0000"
                id="endDate"
              />
              <InputForm
                title="Carga horaria do curso"
                label="Carga horaria do curso"
                name="workload"
                placeholder="500hrs"
                id="workload"
              />
              <InputForm
                title="Inicio das inscrições"
                label="Inicio das inscrições"
                name="startOfRegistration"
                placeholder="00/00/0000"
                id="startOfRegistration"
              />
              <InputForm
                title="Termino das inscrições"
                label="Termino das inscrições"
                name="endOfRegistration"
                placeholder="00/00/0000"
                id="endOfRegistration"
              />
              <InputForm
                title="Numero de vagas"
                label="Numero de vagas"
                name="numberOfVacancies"
                placeholder="30"
                id="numberOfVacancies"
              />
            </div>
            <div className="flex items-center justify-center mt-5">
              <Button variant="lightTextBlack">Cancelar</Button>
              <Button variant="blueButton">Criar</Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
