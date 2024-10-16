import { InputForm } from '@/components/custom/text-input'
import { changePasswordRequestSchema } from '@/models/change-password-request-schema'
import { useChangePasswordRequestQuery } from '@/queries/use-change-password-request-query'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const Route = createFileRoute('/password-changes')({
  component: ChangedPasswordRequests,
})

const initialValues = {
  newPasswordDefault: '',
  requestStatus: '',
  studentName: '',
}

export function ChangedPasswordRequests() {
  const { data: changeRequests } = useChangePasswordRequestQuery()
  const { data: students } = useStudentsListQuery()

  return (
    <>
      <div>
        {changeRequests?.map(({ newPasswordDefault, requestStatus, student }, index) => (
          <div key={index}>
            <p>
              Nova senha padrão {newPasswordDefault}, status da solicitação: {requestStatus}, nome do estudante:{' '}
              {students?.find((doc) => doc.id === student.id)?.name}
            </p>
          </div>
        ))}
      </div>

      <br></br>
      <br></br>

      <h1>Agora envie os dados para validação</h1>
      <Formik
        onSubmit={() => {}}
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(changePasswordRequestSchema)}
      >
        <Form>
          <InputForm
            title="Senha padrão"
            id="newPasswordDefault"
            name="newPasswordDefault"
            placeholder="Digite a senha padrão aqui"
            label="newPasswordDefault"
          />

          <InputForm
            title="Status da requisição"
            id="requestStatus"
            name="requestStatus"
            placeholder="Digite o status da requisição de troca de senha"
            label="requestStatus"
          />
        </Form>
      </Formik>
    </>
  )
}
