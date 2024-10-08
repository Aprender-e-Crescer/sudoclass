import { InputForm } from '@/components/custom/input-form'
import { useChangePasswordRequestQuery } from '@/queries/useChangePasswordRequestQuery'
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

  return (
    <>
      <div>
        {changeRequests?.map(({ newPasswordDefault, requestStatus }, index) => (
          <div key={index}>
            <p>
              Nova senha padrão {newPasswordDefault}, status da solicitação: {requestStatus}
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
