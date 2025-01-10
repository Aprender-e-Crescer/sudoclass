import { InputForm } from '@/components/custom/text-input'
import { InputTextarea } from '@/components/custom/textarea-input'
import { useGetSubjectQuery } from '@/queries/use-get-subject-query'
import { InputLabel } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/details',
)({
  component: SubjectDetails,
})

export function SubjectDetails() {
  const { idSubject } = Route.useParams()
  const subjectId = Number(idSubject)
  const { data, isLoading, error } = useGetSubjectQuery(subjectId)
  console.log(data)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Erro ao carregar os dados.</p>
    )
  }

  return (
    <Formik
      initialValues={{
        name: data?.name || '',
        workload: data?.workload || '',
        menu: data?.menu || '',
      }}
      onSubmit={(values) => console.log('Form submitted:', values)}
    >
      {({ values }) => (
        <Form className="flex flex-col gap-4 mx-20 my-10">
          <div>
            <h1 className="font-bold text-blue-950 text-4xl">
              Ementa da disciplina
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <InputLabel id="CargaHoraria">Disciplina</InputLabel>
              <InputForm
                isDisabled={true}
                id="CargaHoraria"
                name="CargaHoraria"
                type="text"
                placeholder="Carga Horária"
                label="Carga Horária"
                value={values.name}
              />
            </div>

            <div>
              <InputLabel id="CargaHoraria">Carga Horária</InputLabel>
              <InputForm
                isDisabled={true}
                id="CargaHoraria"
                name="CargaHoraria"
                type="text"
                placeholder="Carga Horária"
                label="Carga Horária"
                value={values.workload}
              />
            </div>

            <div>
              <InputLabel id="Ementa">Ementa</InputLabel>
              <InputTextarea
                isDisabled={true}
                id="Ementa"
                name="Ementa"
                placeholder="Ementa"
                label="Ementa"
                value={values.menu}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
