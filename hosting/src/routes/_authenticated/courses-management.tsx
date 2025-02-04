import { currentUserQueryOptions } from '@/queries/use-current-user-query'
import { getUserQueryOptions } from '@/queries/use-get-user-query'
import { getRoleFromRef } from '@/utils/getRoleFromRef'
import { createFileRoute, redirect } from '@tanstack/react-router'
import notFoundImage from '@/assets/not-found.png'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/courses-management')({
  // beforeLoad: async ({ context: { queryClient } }) => {
  //   const currentUser = await queryClient.ensureQueryData(currentUserQueryOptions())
  //   const user = await queryClient.ensureQueryData(getUserQueryOptions(currentUser?.uid))
  //   const role = getRoleFromRef(user?.roleRef)
  //   if (role !== 'admin') throw redirect({ to: '/' })
  // },
  component: CoursesManagement,
})

function CoursesManagement() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={notFoundImage} alt="Not Found Image" />
      <div className="flex flex-col items-center justify-center gap-y-14">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-4xl font-semibold text-gray-950">Ops! Nada por aqui...</h1>
          <p className="text-gray-400 text-xl">Este curso ainda não tem turmas. Que tal criar a primeira?</p>
        </div>
        <div className="flex gap-x-3">
          <Button variant="cancelButton" size="large" className="font-medium text-black">
            Cancelar
          </Button>
          <Button variant="blueButton" size="large" className="font-normal">
            Criar turma
          </Button>
        </div>
      </div>
    </div>
  )
}
