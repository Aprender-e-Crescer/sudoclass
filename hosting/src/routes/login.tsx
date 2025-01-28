import { Formik, Form } from 'formik'
import loginImage from '@/assets/login.png'
import { AiOutlineIdcard } from 'react-icons/ai'
import { InputAuth } from '@/components/custom/auth-input'
import { FaKey } from 'react-icons/fa6'
import { InputCheckbox } from '@/components/custom/checkbox-input'
import { Link, Navigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useLoginController } from '@/controllers/use-login-controller'
import { loginSchema } from '@/models/login-schema'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { masks } from '@/utils/masks'
import { formatWithMask } from '@/utils/formatWithMask'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: Login,
})

const checkboxOptions = [
  {
    value: false,
    label: 'Lembre-me',
  },
]

const initialValues = {
  cpf: '',
  password: '',
}

function Login() {
  const { login, isUserLoggedIn } = useLoginController()
  const [isLoading, setIsLoading] = useState(false)

  const handleOnLoginFormSubmit = async ({ cpf, password }: { cpf: string; password: string }) => {
    setIsLoading(true)

    try {
      const { unmasked } = formatWithMask({
        text: cpf,
        mask: masks.BRL_CPF,
      })

      await login({
        cpf: unmasked,
        password: password,
      })
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isUserLoggedIn) return <Navigate to="/" />

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <Loader2 className="animate-spin h-12 w-12 text-white" />
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={handleOnLoginFormSubmit}
      >
        <Form className="flex flex-col flex-1 justify-center">
          <div className="mx-6">
            <div className="flex flex-col justify-center items-center font-poppins px-4 sm:px-0">
              <div className="w-full text-center lg:hidden mb-4">
                <h1 className="text-[30px] font-bold text-blue-600">Bem-vindo a</h1>
                <span className="text-[40px] font-bold text-blue-900">Sudotec</span>
              </div>

              <div className="flex w-full max-w-6xl h-full lg:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white flex-col lg:flex-row">
                <div className="w-full flex justify-center items-center bg-blue-600 h-[250px] lg:h-full lg:w-1/2">
                  <img
                    src={loginImage}
                    alt="Login do usuário"
                    className="w-[285px] h-[285px] lg:w-[500px] lg:h-[500px]"
                  />
                </div>

                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center h-full space-y-4">
                  <div className="hidden lg:block text-center">
                    <h1 className="text-[40px] font-bold text-blue-600">Bem-vindo a</h1>
                    <span className="text-[50px] font-bold text-blue-900 mb-4">Sudotec</span>
                  </div>

                  <div className="w-full">
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

                      <p>Senha</p>
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

                    <div className="text-blue-600 flex justify-between items-center gap-4 -mt-6 mr-5 ml-4">
                      <InputCheckbox fieldName="remember-me" checkboxValues={checkboxOptions} />
                      <Link to="/" className="text-blue-600 underline text-sm">
                        Esqueceu sua Senha?
                      </Link>
                    </div>

                    <div className="flex justify-between mt-16 ml-4 w-full">
                      <Button variant="blueButton" size="Login" type="submit" disabled={isLoading}>
                        Login
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
