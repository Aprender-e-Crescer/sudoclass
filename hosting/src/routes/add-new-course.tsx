import { InputForm } from '@/components/custom/text-input'
import { matriceSchema } from '@/models/matrice-schema'
import { createFileRoute } from '@tanstack/react-router'
import { Formik } from 'formik'

export const Route = createFileRoute('/add-new-course')({
  component: AddNewCourseForm,
})

function AddNewCourseForm() {
  const handleSubmit = () => {}

  return (
    <Formik
      initialValues={{
        name: '',
        startDate: '',
        endDate: '',
        workload: '',
        startOfRegistration: '',
        endOfRegistration: '',
        numberOfVacancies: '',
      }}
      validationSchema={matriceSchema}
      onSubmit={handleSubmit}
    >
      <form>
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
          placeholder="Termino das inscrições"
          id="endOfRegistration"
        />
        <InputForm
          title="Numero de vagas"
          label="Numero de vagas"
          name="numberOfVacancies"
          placeholder="30"
          id="numberOfVacancies"
        />
      </form>
    </Formik>
  )
}
