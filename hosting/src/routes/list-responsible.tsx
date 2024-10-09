import { createFileRoute } from '@tanstack/react-router'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useListResponsibleQuery } from '@/queries/list-responsible-queries'
import { responsibleSchema } from '@/models/list-responsible-schema'
import { useCreateResponsiblesMutation } from '@/mutations/use-create-responsibles'
import { useStudentsListQuery } from '@/queries/use-students-list-query'

export const Route = createFileRoute('/list-responsible')({
  component: ListResponsible,
})

function ListResponsible() {
  const { data, isLoading, error } = useListResponsibleQuery()
  const { data: students } = useStudentsListQuery()

  const { mutateAsync: createResponsible } = useCreateResponsiblesMutation()

  if (isLoading) {
    return <h1>Carregando...</h1>
  }

  if (error) return <h1>Erro ao carregar os dados: {error.message}</h1>

  return (
    <div>
      <div>
        {data?.map(({ cpf, dateOfBirth, email, name, rg, telephone, address }, index) => (
          <div key={index}>
            <p>Nome: {name}</p>
            <p>CPF: {cpf}</p>
            <p>Data de Nascimento: {dateOfBirth}</p>
            <p>E-mail: {email}</p>
            <p>RG: {rg}</p>
            <p>Telefone: {telephone}</p>
            <p>Cidade: {address.city}</p>
            <p>Bairro: {address.neighborhood}</p>
            <p>Estado: {address.state}</p>
            <p>Rua: {address.street}</p>
            <p>Número: {address.streetNumber}</p>
          </div>
        ))}
        <div>
          {students?.map(({ name }, index) => (
            <div key={index}>
              <p>Nome Alunos: {name}</p>
            </div>
          ))}
        </div>
      </div>
      <Formik
        initialValues={{
          cpf: '',
          dateOfBirth: '',
          email: '',
          name: '',
          rg: '',
          telephone: '',
          address: {
            city: '',
            neighborhood: '',
            state: '',
            street: '',
            streetNumber: '',
          },
        }}
        validationSchema={toFormikValidationSchema(responsibleSchema)}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          return createResponsible(values)
        }}
      >
        <Form>
          <div>
            <label htmlFor="name">Nome:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="cpf">CPF:</label>
            <Field type="text" name="cpf" />
            <ErrorMessage name="cpf" component="div" />
          </div>

          <div>
            <label htmlFor="dateOfBirth">Data de Nascimento:</label>
            <Field type="date" name="dateOfBirth" />
            <ErrorMessage name="dateOfBirth" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="rg">RG:</label>
            <Field type="text" name="rg" />
            <ErrorMessage name="rg" component="div" />
          </div>

          <div>
            <label htmlFor="telephone">Telefone:</label>
            <Field type="text" name="telephone" />
            <ErrorMessage name="telephone" component="div" />
          </div>

          <div>
            <label htmlFor="address.city">Cidade:</label>
            <Field type="text" name="address.city" />
            <ErrorMessage name="address.city" component="div" />
          </div>

          <div>
            <label htmlFor="address.neighborhood">Bairro:</label>
            <Field type="text" name="address.neighborhood" />
            <ErrorMessage name="address.neighborhood" component="div" />
          </div>

          <div>
            <label htmlFor="address.state">Estado:</label>
            <Field type="text" name="address.state" />
            <ErrorMessage name="address.state" component="div" />
          </div>

          <div>
            <label htmlFor="address.street">Rua:</label>
            <Field type="text" name="address.street" />
            <ErrorMessage name="address.street" component="div" />
          </div>

          <div>
            <label htmlFor="address.streetNumber">Número:</label>
            <Field type="number" name="address.streetNumber" />
            <ErrorMessage name="address.streetNumber" component="div" />
          </div>

          <button type="submit">Adicionar</button>
        </Form>
      </Formik>
    </div>
  )
}
