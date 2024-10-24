import { matriceSchema } from '@/models/matrice-schema'
import { useCreateSchoolMatriceMutation } from '@/mutations/use-create-school-matrice-mutation'
import { useListSchoolMatricesQuery } from '@/queries/list-school-matrices'
import { createFileRoute } from '@tanstack/react-router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/school-matrices')({
  component: SchoolMatrices,
})

function SchoolMatrices() {
  const { data, isLoading, error } = useListSchoolMatricesQuery()

  const { mutateAsync: createSchoolMatrice } = useCreateSchoolMatriceMutation()

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  if (error) return <h1>Erro ao carregar os dados</h1>

  return (
    <div>
      <div>
        {data?.map((matrice, index) => (
          <div key={index}>
            <p>
              <strong>Nome:</strong> {matrice.name}
            </p>
            <p>
              <strong>Número de Aulas:</strong> {matrice.numberOfClasses}
            </p>
            <p>
              <strong>Carga Horária:</strong> {matrice.workload} horas
            </p>
          </div>
        ))}
      </div>

      <div>
        <Formik
          initialValues={{ name: '', numberOfClasses: '', workload: '' }}
          validationSchema={toFormikValidationSchema(matriceSchema)}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 2000))
            return createSchoolMatrice(values)
          }}
        >
          <Form>
            <div>
              <label htmlFor="name">Nome:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="numberOfClasses">Número de aulas:</label>
              <Field type="number" name="numberOfClasses" />
              <ErrorMessage name="numberOfClasses" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="workload">Carga Horária:</label>
              <Field type="number" name="workload" />
              <ErrorMessage name="workload" component="div" className="text-red-600" />
            </div>

            <button type="submit">Adicionar</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SchoolMatrices
