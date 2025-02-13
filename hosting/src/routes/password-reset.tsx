import passwordResetImage from '@/assets/password-reset.png'
import { InputAuth } from '@/components/custom/auth-input'
import { Button } from '@/components/ui/button'
import { usePasswordRequestController } from '@/controllers/password-request-controller'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { formatWithMask } from '@/utils/formatWithMask'
import { masks } from '@/utils/masks'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { isValidCPF } from '../../../functions/src/utils/isValidCPF'
import { FaKey } from 'react-icons/fa6'

export const Route = createFileRoute('/password-reset')({
  component: PasswordReset,
})

const validationSchema = z.object({
  cpf: z.string().refine(isValidCPF, 'Inválido'),
  password: z.string().min(8),
})

function PasswordReset() {
  const [cpf, setCpf] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [hasRequested, setRequested] = useState<boolean>(false)

  const { addPasswordRequest } = usePasswordRequestController()

  const userQueryOptions = getUserQueryOptions(cpf)
  const { data: user } = useQuery({ ...userQueryOptions, enabled: !!cpf })

  const handleSubmit = async ({ cpf, password }: { cpf: string; password: string }) => {
    try {
      const { unmasked } = formatWithMask({
        text: cpf,
        mask: masks.BRL_CPF,
      })
      setCpf(unmasked)
      setPassword(password)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user?.profileRef && !hasRequested && password) {
      const profileRef = user.profileRef

      addPasswordRequest({ profileRef, password })
      setRequested(true)
    }
  }, [user?.profileRef, hasRequested, password])

  return (
    <Formik
      initialValues={{ cpf: '', password: '' }}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="flex flex-col justify-center items-center w-full min-h-screen px-4 sm:px-8 font-poppins">
          <div className="flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white">
            <div className="w-full md:w-1/2 flex justify-center items-center bg-blue-600 h-[250px] sm:h-[350px] md:h-auto">
              <img
                src={passwordResetImage}
                alt="Imagem de redefinição de senha"
                className="w-[200px] h-[200px] sm:w-[285px] sm:h-[285px] md:w-[500px] md:h-[500px]"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center space-y-6">
              <h1 className="text-[22px] sm:text-[24px] md:text-[28px] font-extrabold text-center text-blue-900">
                Redefinição de Senha
              </h1>

              <p className="text-[14px] sm:text-[16px] md:text-[18px] text-blue-600 text-left px-4">
                Informe seu CPF para a redefinição de senha
              </p>

              <Form className="w-full px-4">
                <div className="w-full flex flex-col items-start mb-2 text-blue-600 px-4 space-y-1">
                  <p>CPF</p>
                  <div className="w-full">
                    <InputAuth
                      icon={<AiOutlineIdcard />}
                      mask={masks.BRL_CPF}
                      placeholder="000.000.000-00"
                      id="cpf"
                      name="cpf"
                    />
                  </div>

                  <p>Nova senha</p>
                  <div className="w-full">
                    <InputAuth
                      icon={<FaKey />}
                      placeholder="**********"
                      id="password"
                      name="password"
                      isPasswordInput={true}
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <Button variant="blueButton" type="submit" size="Login" className="w-full py-2 sm:py-3">
                    {isSubmitting ? 'Carregando' : 'Enviar'}
                  </Button>
                  <Button variant="blueButton" size="Login" className="w-full py-2 sm:py-3">
                    Retornar
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default PasswordReset
