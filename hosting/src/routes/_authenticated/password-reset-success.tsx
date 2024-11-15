import { Formik, Form } from 'formik'
import loginImage from '@/assets/image-reset-password-success.png'
import { FaKey } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { z } from 'zod'
import { InputAuth } from '@/components/custom/auth-input'

export const Route = createFileRoute('/_authenticated/password-reset-success')({
  component: PasswordResetSuccess,
})

const resetSuccessSchema = z.object({
  password: z.string(),
})

const initialValues = {
  password: 'Exemplo123',
}

export function PasswordResetSuccess() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={toFormikValidationSchema(resetSuccessSchema)}
    >
      <Form>
        <div>
          <div className="flex flex-col justify-center items-center mb-24 min-h-screen mt-20 font-poppins px-4 sm:px-0">
            <div className="w-full text-center mb-4 md:hidden">
              <h1 className="text-[30px] font-bold text-blue-900">
                Senha Redefinida!
              </h1>
              <p className="text-base text-blue-600 mt-4 md:hidden">
                A senha do aluno(a) foi redefinida com sucesso.
              </p>
            </div>

            <div className="flex w-full max-w-6xl h-full md:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white flex-col md:flex-row mb-36">
              <div className="w-full flex justify-center items-center bg-blue-600 h-[250px] md:h-full md:w-1/2">
                <img
                  src={loginImage}
                  alt="Login do usuário"
                  className="w-[285px] h-[285px] md:w-[500px] md:h-[500px]"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center h-full space-y-4">
                <div className="hidden md:block text-center mb-12">
                  <h1 className="text-[40px] font-bold text-blue-900">
                    Senha Redefinida!
                  </h1>
                  <p className="text-base text-blue-600 mt-7">
                    A senha do aluno(a) foi redefinida com sucesso.
                  </p>
                </div>

                <div className="w-full">
                  <div className="w-full flex flex-col items-start mb-2 text-blue-600 px-4 space-y-1">
                    <p>Senha</p>
                    <div className="w-full">
                      <InputAuth
                        icon={<FaKey />}
                        placeholder=""
                        id="password"
                        name="password"
                        isCopyInput
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-16 ml-4 w-full">
                    <Button variant="blueButton" size="Login" type="submit">
                      Retornar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
export default PasswordResetSuccess
