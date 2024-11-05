import approveResetPassword from '@/assets/approveResetPassword.png'

import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

interface ApproveResetPasswordProps {
  aluno : string
}


export const Route = createFileRoute('/approve-reset-password')({
  component: ApproveResetPassword,
})

export function ApproveResetPassword({aluno = "Aluno"} : ApproveResetPasswordProps) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-24 min-h-screen font-poppins px-4 sm:px-0">
        <div className="flex w-full max-w-6xl h-full md:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white flex-col md:flex-row mb-36">
          <div className="w-full flex justify-center items-center bg-blue-600 h-[250px] md:h-full md:w-1/2">
            <img
              src={approveResetPassword}
              alt="Login do usuário"
              className="w-[285px] h-[285px] md:w-[500px] md:h-[500px]"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center h-full space-y-4">
            <div className="hidden md:block text-center">
              <h1 className="text-[24px] font-semibold text-blue-600 font-poppins">
                O aluno {aluno} solicitou uma redefinição de senha. Caso aprove, copie a nova senha gerada e envie ao
                aluno(a).
              </h1>
            </div>

            <div className="w-full">
              <div className="flex justify-between mt-24 ml-4 w-full">
                <Button variant="blueButton" size="Login" type="submit">
                  Redefinir senha
                </Button>
              </div>

              <div className="flex justify-between mt-6 ml-4 w-full">
                <Button variant="whiteButtom" size="Login" type="submit">
                  Retornar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
