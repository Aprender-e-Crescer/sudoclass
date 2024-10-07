import { firestore } from '@/services/firebase'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { collection, getDocs } from 'firebase/firestore'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const matrixSchema = z.object({
  name: z.string(),
  numberOfClasses: z.number(),
  workload: z.number(),
})

const matricesSchema = z.array(matrixSchema)

export const Route = createFileRoute('/school-matrices')({
  component: SchoolMatrices,
})

function SchoolMatrices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getMatrices'],
    queryFn: async () => {
      const matricesRef = collection(firestore, 'schoolMatrices')
      const snapshot = await getDocs(matricesRef)
      const matricesData = snapshot.docs.map((doc) => doc.data())

      const parsedData = matricesSchema.safeParse(matricesData)

      if (!parsedData.success) {
        throw new Error('Invalid data structure')
      }

      return parsedData.data
    },
  })

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    )
  }

  if (error) return <h1>Erro ao carregar os dados.</h1>

  return (
    <div>
      <div>
        {data?.map(({ name, numberOfClasses, workload }, index) => (
          <div key={index}>
            <p>
              <strong>Nome:</strong> {name}
            </p>
            <p>
              <strong>Número de Aulas:</strong> {numberOfClasses}
            </p>
            <p>
              <strong>Carga Horária:</strong> {workload} horas
            </p>
          </div>
        ))}
      </div>

      <div>
        <Formik
          initialValues={{ name: '', numberOfClasses: '', workload: '' }}
          validationSchema={toFormikValidationSchema(matrixSchema)}
          onSubmit={(values, { resetForm }) => {
            console.log('Form values:', values)
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Nome:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label htmlFor="numberOfClasses">Numeros de aulas:</label>
                <Field type="number" name="numberOfClasses" />
                <ErrorMessage name="numberOfClasses" component="div" />
              </div>

              <div>
                <label htmlFor="workload">Carga Horária:</label>
                <Field type="number" name="workload" />
                <ErrorMessage name="workload" component="div" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Adicionar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SchoolMatrices
